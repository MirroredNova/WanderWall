import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { IGym } from '../utils/types';

const Card = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.dark};
  background-color: ${(props) => props.theme.light};
  padding: 24px;
  margin: 20px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, .25);
  width: 300px;
  transition: all .2s ease-in-out;

  #image {
    position: relative;
    width: 100%;
    height: 300px;
  }

  #title {
    text-align: center;
    padding: 10px;
  }

  #info {
    display: flex;
    justify-content: space-between;
  }
  
  &:hover {
    transform: scale(1.03);
  }
`;

type Props = {
  gym: IGym
  refreshData: () => void
}

const GymCard = ({ gym, refreshData }: Props) => (
  <>
    {/* <button
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
    </button> */}
    <Card
      href={`/gyms/${gym._id}`}
    >
      <div id="image">
        <Image src={`/images/${gym._id}.png`} alt="gym_image" fill />
      </div>
      <div id="title">
        <h3>{gym.name}</h3>
      </div>
      <div id="info">
        <div>
          Rating:
          {' '}
          {gym.overallRating}
        </div>
        <div>{gym.location}</div>
      </div>
    </Card>

  </>

);

export default GymCard;
