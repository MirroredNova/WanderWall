import React, { useState } from 'react';
import styled from 'styled-components';
import CreateForm from '../components/CreateForm';
import { IGym } from '../utils/types';

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
    overallRating: -1,
    description: '',
    sections: [],
  });

  const submitGymHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(data);
    const res = await fetch('/api/gyms/add_gym', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(res);
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

  return (
    <div>
      <CreateFormContainer onSubmit={submitGymHandler}>
        <CreateForm data={data} changeHandler={changeHandler} />
      </CreateFormContainer>
    </div>
  );
};

export default Create;
