import React, { useState } from 'react';
// import pic1 from '../assets/gallery/image1.jpg'
import pic2 from '../assets/gallery/image2.jpg'
import pic3 from '../assets/gallery/1.webp'
import pic4 from '../assets/gallery/image5.jpg'
// import pic5 from '../assets/gallery/image6.webp'
import pic6 from '../assets/gallery/22.webp'

import pic7 from '../assets/gallery/image8.png'
import pic8 from '../assets/gallery/image9.png'
import pic9 from '../assets/gallery/12.webp'
import pic10 from '../assets/gallery/image11.jpg'
import pic12 from '../assets/gallery/31.jpg'
import pic13 from '../assets/gallery/xyz1.jpg'
import pic14 from '../assets/home/1.jpg'
import pic15 from '../assets/home/2.jpg'
import pic16 from '../assets/gallery/crest2.jpg'
import pic17 from '../assets/gallery/crest1.jpg'
import pic18 from '../assets/gallery/crest3.jpg'
// import pic14 from '../assets/gallery/24.webp'
// import pic15 from '../assets/gallery/25.webp'
// import pic16 from '../assets/gallery/26.webp'
// import pic7 from '../assets/gallery/7.png'
// import pic8 from '../assets/gallery/8.png'
// import pic9 from '../assets/gallery/9.png'
// import pic10 from '../assets/gallery/10.png'



import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const tabs = [
  { id: 1, title: 'EXTERIOR', photos: [ pic17,pic18,pic16,pic15,pic14,pic2,pic4,pic6,pic7,pic8,pic9,pic10,pic12,pic13] },
];

function NextArrow(props) {
  // eslint-disable-next-line react/prop-types
  const { onClick } = props;
  return (
    <div onClick={onClick}>
      <svg width="1.5em" 
            height="1.5em" 
            viewBox="0 0 24 24" 
            strokeWidth="4" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            color="currentColor" 
            data-role="none" 
            className="slick-arrow slick-next" 
            style={{ display: 'block' }} 
            // eslint-disable-next-line react/no-unknown-property
            currentslide="0" slidecount="4"
            >
              <path d="M3 12L21 12M21 12L12.5 3.5M21 12L12.5 20.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
    </div>
  );
}


function PrevArrow(props) {
  // eslint-disable-next-line react/prop-types
  const { onClick } = props;
  return (
    <div onClick={onClick}>
      <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" strokeWidth="4" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" data-role="none" className="slick-arrow slick-prev" style={{ display: 'block' }} 
      // eslint-disable-next-line react/no-unknown-property
      currentslide="0" slidecount="4">
        <path d="M21 12L3 12M3 12L11.5 20.5M3 12L11.5 3.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    </div>
  );
}


export const Gallery = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1.05,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="pb-12 px-4 md:px-24 mx-auto bg-white py-10 md:pt-20" id="Gallery">
      <div className='text-3xl md:text-5xl font-normal uppercase font-subheading w-full text-black'>
        Gallery
      </div> 
      <div className='gap-0 md:py-6'>
        {tabs.map((tab) =>
          (
            <Slider {...settings} key={tab.id}>
              {tab.photos.map((photo, index) => (
                // eslint-disable-next-line react/jsx-key
                <div className='w-fit'>
                 <img
                  key={index}
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  style={{objectFit: 'cover' }}
                  className="px-2 py-5 w-fit h-[30vh] md:h-[70vh]"
                />
                </div>

              ))}
            </Slider>
          )
        )}
      </div>
    </div>
  );
};