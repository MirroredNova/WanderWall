import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Shared/Button';
import Input from '../Shared/Input';

const LoginFormContainer = styled.form`
  margin: 25px 0;
  display: flex;
  align-items: center;
  justify-content: center;

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

type Props = {
  authenticatedChangeHandler: (newState: boolean) => void
}

const LoginForm = ({ authenticatedChangeHandler }: Props) => {
  const [password, setPassword] = useState('');

  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginRes = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
    console.log(loginRes);
    if (loginRes.status === 200) authenticatedChangeHandler(true);
  };

  return (
    <LoginFormContainer onSubmit={submitHandler}>
      <div>
        <h1>Login</h1>
        <div>
          <Input
            label="Password"
            type="text"
            id="password"
            value={password}
            onChange={passwordChangeHandler}
          />
          <Button type="submit" themeColor="main">Submit</Button>
        </div>
      </div>
    </LoginFormContainer>
  );
};

export default LoginForm;
