import React, { useState } from 'react';
import styled from 'styled-components';
import { IApiResGym, IGym, ISection } from '../../utils/types';
import CreateFormSection from './CreateFormSection';
import ImageInput from '../Shared/ImageInput';
import Input from '../Shared/Input';

interface ButtonProps {
  themeColor: string
}

const Button = styled.button<ButtonProps>`
  width: 100%;
  background-color: ${(props) => props.theme[props.themeColor]};
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CreateFormContainer = styled.form`
  margin: 25px 0;

  input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  div {
    margin: 25px 0;
  }
`;

const url = 'https://api.cloudinary.com/v1_1/dhhcxidye/image/upload';

const CreateForm = () => {
  const [data, setData] = useState<IGym>({
    name: '',
    overallRating: 0,
    description: '',
    location: '',
    sections: [],
  });
  const [numSections, setNumSections] = useState<number>(0);
  const [selectedHeaderFile, setSelectedHeaderFile] = useState<File>();
  const [selectedContentFiles, setSelectedContentFiles] = useState<File[]>();

  const imageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setSelectedHeaderFile(files[0]);
    }
  };

  const multipleImageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;
    const filesList: File[] = [];

    for (let i = 0; i < files.length; i += 1) {
      const file = files.item(i);
      if (!file) return;
      filesList.push(file);
    }

    setSelectedContentFiles(filesList);
  };

  const uploadImage = async (contentFile: File): Promise<string> => {
    const contentImageForm: any = new FormData();
    contentImageForm.append('file', contentFile);
    contentImageForm.append('upload_preset', 'yhgfdywb');
    const contentRes = await fetch(url, {
      method: 'POST',
      body: contentImageForm,
    });
    const contentResData = await contentRes.json();
    return contentResData.url;
  };

  const submitGymHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form data submission
    try {
      const formData: IApiResGym = {
        ...(JSON.parse(JSON.stringify(data))),
        imagePaths: [],
      };

      const tempImagePaths = [];
      tempImagePaths.push(uploadImage(selectedHeaderFile!));
      tempImagePaths.push(...selectedContentFiles!.map((file) => {
        const urlTemp = uploadImage(file!);
        return urlTemp;
      }));
      formData.imagePaths.push(...await Promise.all(tempImagePaths));

      // Handle main gym database creation
      const mainRes = await fetch('/api/gyms/add_gym', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      await mainRes.json();
    } catch (err: any) {
      console.log(err.response?.data);
    } finally {
      setData({
        name: '',
        overallRating: 0,
        description: '',
        location: '',
        sections: [],
      });
      setNumSections(0);
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sectionChangeHandler = (value: string, name: string, num: number) => {
    setData((prevData) => {
      const section = prevData.sections[num];
      if (name === 'name') section.name = value;
      else if (name === 'rating') section.rating = +value;
      else if (name === 'description') section.description = value;
      return {
        ...prevData,
      };
    });
  };

  const addSectionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setNumSections((prevState) => prevState + 1);
    const newSection: ISection = {
      name: '',
      rating: 0,
      description: '',
    };
    data.sections.push(newSection);
  };

  return (
    <CreateFormContainer onSubmit={submitGymHandler} encType="multipart/form-data">
      <h1>Add New Gym</h1>
      <div>
        <ImageInput id="coverImage" label="Cover Image" imageChangeHandler={imageChangeHandler} multiple={false} required />
        <Input
          id="name"
          type="text"
          label="Name"
          value={data.name}
          onChange={changeHandler}
        />
        <Input
          id="overallRating"
          type="number"
          label="Overall Rating"
          value={data.overallRating}
          onChange={changeHandler}
          properties={{ min: '0', max: '10' }}
        />
        <Input
          id="description"
          type="text"
          label="Description"
          value={data.description}
          onChange={changeHandler}
        />
        <Input
          id="location"
          type="text"
          label="Location"
          value={data.location}
          onChange={changeHandler}
        />
        <ImageInput id="contentImage" label="Content Images" imageChangeHandler={multipleImageChangeHandler} multiple required />
      </div>
      <div>
        {numSections !== 0 && <h1>Custom Sections</h1>}
        {data.sections.map((obj, i) => (
          <CreateFormSection
            key={+i}
            section={obj}
            sectionId={+i}
            sectionChangeHandler={sectionChangeHandler}
          />
        ))}
        <Button type="button" onClick={addSectionHandler} themeColor="dark">Add Section</Button>
      </div>
      <Button type="submit" themeColor="main">Submit</Button>
    </CreateFormContainer>
  );
};

export default CreateForm;
