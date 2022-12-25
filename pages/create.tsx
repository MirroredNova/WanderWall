import React, { useState } from 'react';
import styled from 'styled-components';
import CreateForm from '../components/CreateForm';
import { IGym, ISection } from '../utils/types';

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

const Create = () => {
  const [data, setData] = useState<IGym>({
    name: '',
    overallRating: 0,
    description: '',
    location: '',
    sections: [],
  });
  const [numSections, setNumSections] = useState<number>(0);
  const [selectedHeaderFile, setSelectedHeaderFile] = useState<File>();

  const imageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (target.files) {
      const file = target.files[0];
      setSelectedHeaderFile(file);
    }
  };

  const submitGymHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form data submission
    try {
      const mainRes = await fetch('/api/gyms/add_gym', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const mainResData = await mainRes.json();
      console.log(mainResData);

      // Handle image upload
      const formData = new FormData();
      if (!selectedHeaderFile) return;
      formData.append('image', selectedHeaderFile);
      const imgRes = await fetch('/api/gyms/add_image', {
        method: 'POST',
        body: formData,
      });
    } catch (err: any) {
      console.log(err.response?.data);
    } finally {
      // setData({
      //   name: '',
      //   overallRating: 0,
      //   description: '',
      //   location: '',
      //   sections: [],
      // });
      // setNumSections(0);
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name } = event.target;
    const value = type === 'checkbox'
      ? event.target.checked
      : event.target.value;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addSectionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setNumSections((prevState) => prevState + 1);
    const newSection: ISection = {
      name: '',
      rating: -1,
      description: '',
    };
    data.sections.push(newSection);
  };

  return (
    <div>
      <CreateFormContainer onSubmit={submitGymHandler}>
        <CreateForm
          data={data}
          imageChangeHandler={imageChangeHandler}
          changeHandler={changeHandler}
          addSectionHandler={addSectionHandler}
          numSections={numSections}
        />
      </CreateFormContainer>
    </div>
  );
};

export default Create;
