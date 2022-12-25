import React, { useState } from 'react';
import styled from 'styled-components';
import { IGym, ISection } from '../utils/types';
import CreateFormSection from './CreateFormSection';
import Input from './Input';

const MainInputsContainer = styled.div`
  
`;

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

type Props = {
  data: IGym
  // eslint-disable-next-line no-unused-vars
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CreateForm = ({ data, changeHandler }: Props) => {
  const [numSections, setNumSections] = useState<number>(0);

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

  console.log(data);

  return (
    <>
      <h1>Add New Gym</h1>
      <MainInputsContainer>
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
      </MainInputsContainer>
      <div>
        {numSections !== 0 && <h1>Custom Sections</h1>}
        {data.sections.map((obj, i) => (
          <CreateFormSection key={+i} section={obj} />))}
        <Button type="button" onClick={addSectionHandler} themeColor="dark">Add Section</Button>
      </div>
      <Button type="submit" themeColor="main">Submit</Button>
    </>
  );
};

export default CreateForm;
