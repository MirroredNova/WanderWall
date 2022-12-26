/* eslint-disable no-param-reassign */
import React from 'react';
import { ISection } from '../utils/types';
import Input from './Input';

type Props = {
  section: ISection
}

const CreateFormSection = ({ section }: Props) => {
  const handleSectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    console.log(value);
    console.log(name);
    console.log(section);
    if (name === 'name') {
      section.name += value;
    } else if (name === 'rating') {
      section.rating += +value;
    } else if (name === 'description') {
      section.description += value;
    }
  };

  return (
    <div>
      <Input
        label="Name"
        id="name"
        type="text"
        onChange={handleSectionChange}
        value={section.name}
      />
      <Input
        label="Rating"
        id="rating"
        type="number"
        onChange={handleSectionChange}
        value={section.rating}
        properties={{ min: '0', max: '10' }}
      />
      <Input
        label="Description"
        id="description"
        type="text"
        onChange={handleSectionChange}
        value={section.description}
      />
    </div>
  );
};

export default CreateFormSection;
