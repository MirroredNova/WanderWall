/* eslint-disable no-underscore-dangle */
import React from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import GymCard from '../../components/Gyms/GymCard';
import { IApiResGym } from '../../utils/types';

const GymContainer = styled.div`
  color: ${(props) => props.theme.dark};
`;

const HeaderContainer = styled.div`
  padding: 24px 0;
  text-align: center;
`;

const CardContainer = styled.div`
  display: grid;
  width: 0%;
  margin: auto;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
`;

export const getServerSideProps: GetServerSideProps = async () => {
  const gymRes = await fetch(`${process.env.API_URL}/api/gyms/get_gyms`);
  const gymData = await gymRes.json();
  return {
    props: {
      gyms: gymData,
    },
  };
};

type Props = {
  gyms: IApiResGym[]
}

const Gyms = ({ gyms }: Props) => {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <GymContainer>
      <Head>
        <title>
          WanderWall - Gyms
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderContainer>
        <h1>Gyms</h1>
      </HeaderContainer>
      <CardContainer>
        {gyms.map((gym: IApiResGym) => {
          const headerImage = gym.imagePaths[0];
          return (
            <GymCard key={gym._id} gym={gym} imagePath={headerImage} refreshData={refreshData} />
          );
        })}
      </CardContainer>
    </GymContainer>
  );
};

export default Gyms;
