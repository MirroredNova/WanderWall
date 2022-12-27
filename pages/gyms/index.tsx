/* eslint-disable no-underscore-dangle */
import React from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import GymCard from '../../components/Gyms/GymCard';
import { IImgFolder, IGym } from '../../utils/types';

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
  const gymRes = await fetch('http://localhost:3000/api/gyms/get_gyms');
  const gymData = await gymRes.json();
  const imgRes = await fetch('http://localhost:3000/api/gyms/get_images?content=header');
  const imgData = (await imgRes.json()).folders;
  return {
    props: {
      gyms: gymData,
      images: imgData,
    },
  };
};

type Props = {
  gyms: IGym[]
  images: IImgFolder[]
}

const Gyms = ({ gyms, images }: Props) => {
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
        {gyms.map((gym: IGym) => {
          const headerImage = images.filter((image) => (image.id === gym._id))[0];
          return (
            <GymCard key={gym._id} gym={gym} imagePath={`/images/${headerImage.id}/${headerImage.images[0]}`} refreshData={refreshData} />
          );
        })}
      </CardContainer>
    </GymContainer>
  );
};

export default Gyms;
