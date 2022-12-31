import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';

type Props = {}

const GymCardGallery = (props: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div>GymCardGallery</div>
  );
};

export default GymCardGallery;
