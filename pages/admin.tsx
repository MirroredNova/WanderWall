import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import LoginForm from '../components/Administration/LoginForm';
import ManagementPage from '../components/Administration/ManagementPage';
import { IApiResGym } from '../utils/types';

type Props = {
  gyms: IApiResGym[]
}

export const getServerSideProps: GetServerSideProps = async () => {
  const gymRes = await fetch(`${process.env.API_URL}/api/gyms/get_gyms`);
  const gymData = await gymRes.json();
  return {
    props: {
      gyms: gymData,
    },
  };
};

const Admin = ({ gyms }: Props) => {
  const [authenticated, setAuthenticated] = useState(false);

  const authenticatedChangeHandler = (newState: boolean) => {
    setAuthenticated(newState);
  };

  if (authenticated) {
    return (
      <ManagementPage gyms={gyms} />
    );
  }
  return (
    <LoginForm authenticatedChangeHandler={authenticatedChangeHandler} />
  );
};

export default Admin;
