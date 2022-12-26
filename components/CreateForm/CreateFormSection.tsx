/* eslint-disable no-param-reassign */
import React from 'react';
import { ISection } from '../../utils/types';
import Input from '../Shared/Input';

type Props = {
  sectionId: number
  section: ISection
  // eslint-disable-next-line no-unused-vars
  sectionChangeHandler: (value: string, name: string, num: number) => void
}

const CreateFormSection = ({ sectionId, section, sectionChangeHandler }: Props) => {
  const handleSectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    sectionChangeHandler(value, name, sectionId);
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
