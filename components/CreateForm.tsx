import React from 'react';
import styled from 'styled-components';
import { IGym } from '../utils/types';
import CreateFormSection from './CreateFormSection';
import ImageInput from './ImageInput';
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
  numSections: number
  // eslint-disable-next-line no-unused-vars
  imageChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  // eslint-disable-next-line no-unused-vars
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  // eslint-disable-next-line no-unused-vars
  addSectionHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const CreateForm = ({
  data,
  numSections,
  imageChangeHandler,
  changeHandler,
  addSectionHandler,
}: Props) => (
  <>
    <h1>Add New Gym</h1>
    <MainInputsContainer>
      <ImageInput id="coverImage" label="Cover Image" imageChangeHandler={imageChangeHandler} />
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

export default CreateForm;
