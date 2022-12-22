import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { IGym } from '../../utils/types';

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
  grid-template-columns: 2fr 1fr;
  * {
    border: 1px solid red;
  }
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
      <HeaderContainer>
        <h1>{gym?.name}</h1>
      </HeaderContainer>
      <ImageContainer>
        some images
      </ImageContainer>
      <ContentContainer>
        <div>General Description</div>
        <div>section 2</div>
        <div>section 1</div>
        <div>section 2</div>
        <div>section 1</div>
        <div>section 2</div>
      </ContentContainer>
    </GymContainer>
  );
};

export default GymID;
