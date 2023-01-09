import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const SwiperSlideContainer = styled(SwiperSlide)`
  img {
    object-fit: cover;
    width: 400px;
    height: 400px;
  }
`;

type Props = {
  imagePaths: string[]
}

const GymCardGallery = ({ imagePaths }: Props) => {
  const filteredImagePaths = imagePaths.filter((image) => image);

  return (
    <Swiper
      pagination={{
        type: 'fraction',
      }}
      navigation
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {filteredImagePaths.map((image, i) => (
        <SwiperSlideContainer key={+i} style={{ paddingBottom: '5px' }}>
          <Image src={image} alt="gym_image" width={1000} height={1000} />
        </SwiperSlideContainer>
      ))}
    </Swiper>
  );
};

export default GymCardGallery;
