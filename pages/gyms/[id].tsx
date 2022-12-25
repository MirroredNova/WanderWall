import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Head from 'next/head';
import { IGym } from '../../utils/types';
import GymCardSection from '../../components/GymCardSection';

const GymContainer = styled.div`
  color: ${(props) => props.theme.dark};
`;

const HeaderContainer = styled.div`
  padding: 24px 0;
  text-align: center;
`;

const ImageContainer = styled.div`
  text-align: center;
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const MainInfoContainer = styled.div`
  display: flex;
  padding: 16px;
  justify-content: space-between;
  color: ${(props) => props.theme.light};
  background-color: ${(props) => props.theme.main};
  margin: 8px 0%;
  padding: 16px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, .15);
`;

const GymID = () => {
  const router = useRouter();
  const [gym, setGym] = useState<IGym>();

  useEffect(() => {
    const apiCall = async (id: string | string[] | undefined) => {
      const res = await fetch(`/api/gyms/get_gym?id=${id}`);
      const gymData = await res.json();
      setGym(gymData);
    };
    if (router.isReady) {
      const { id } = router.query;
      apiCall(id);
    }
  }, [router.isReady, router.query]);

  return (
    <GymContainer>
      <Head>
        <title>
          WanderWall -
          {' '}
          {gym?.name}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderContainer>
        <h1>{gym?.name}</h1>
      </HeaderContainer>
      <ImageContainer>
        some images
      </ImageContainer>
      <ContentContainer>
        <MainInfoContainer>
          <div>{gym?.description}</div>
          <div>{gym?.overallRating}</div>
        </MainInfoContainer>
        {gym?.sections.map((section, i) => <GymCardSection section={section} key={+i} />)}
      </ContentContainer>
    </GymContainer>
  );
};

export default GymID;
