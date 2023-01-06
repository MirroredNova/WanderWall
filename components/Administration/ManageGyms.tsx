import React from 'react';
import styled from 'styled-components';
import { IApiResGym } from '../../utils/types';

type Props = {
  gyms: IApiResGym[]
  refreshData: () => void
}

const GymList = styled.ul`
  margin-top: 25px;

  li {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    margin: 5px;

    div {
      padding-left: 10px;
      display: flex;
      grid-column-start: 1;
      grid-column-end: 5;
      align-items: center;
    }

    button {
      padding: 5px;
    }
  }
`;

const ManageGyms = ({ gyms, refreshData }: Props) => (
  <>
    <h1 style={{ margin: '25px 0' }}>Existing Gyms</h1>
    <GymList>
      {gyms.map((gym) => (
        <li key={gym._id}>
          <div>{gym.name}</div>
          <button
            type="button"
            onClick={async () => {
              const res = await fetch('/api/gyms/delete_gym', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(gym),
              });
              if (res.status < 300) refreshData();
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </GymList>
  </>

);

export default ManageGyms;
