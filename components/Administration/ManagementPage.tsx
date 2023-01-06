import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { IApiResGym } from '../../utils/types';
import CreateForm from '../CreateForm/CreateForm';
import Button from '../Shared/Button';
import ManageGyms from './ManageGyms';

const ManagementSwitcher = styled.div`
margin-top: 25px;
  display: flex;

  button {
    margin: 4px;
  }
`;

type Props = {
  gyms: IApiResGym[]
}

type Tab = {
  selected: 'view' | 'create'
}

const ManagementPage = ({ gyms }: Props) => {
  const [tab, setTab] = useState<Tab['selected']>('view');
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const renderSwitch = (param: Tab['selected']) => {
    switch (param) {
      case 'view':
        return <ManageGyms gyms={gyms} refreshData={refreshData} />;
      case 'create':
        return <CreateForm />;
      default:
        return undefined;
    }
  };

  return (
    <div>
      <h1>Item Mangement</h1>
      <ManagementSwitcher>
        <Button type="button" themeColor="main" onClick={() => setTab('view')}>View Gyms</Button>
        <Button type="button" themeColor="main" onClick={() => setTab('create')}>Create Gym</Button>
      </ManagementSwitcher>
      {renderSwitch(tab)}
    </div>
  );
};

export default ManagementPage;
