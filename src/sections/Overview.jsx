import React from 'react';
import image from '../assets/gallery/crest2.jpg';
import Button from '../components/button/buttonMain';

export const Overview = ({ contactmodal, setContactModal }) => {
  return (
    <div className="bg-PrestigeGrey">
      <section
        className="w-full flex flex-wrap items-center justify-between gap-[20 px] mx-auto pb-10 md:py-16 px-5 md:px-[7.5rem]"
        
        id="Overview"
      >
        {/* Overview Text Section */}
        <div className="flex flex-col justify-center items-center text-center gap-6 md:items-start md:text-left">
          <h1 className="font-subheading font-normal text-3xl md:text-5xl text-black uppercase">
            Overview
          </h1>
          <div className="max-w-2xl md:text-base text-sm text-black font-body font-light">
            <p className="font-bold text-lg md:text-xl">
              Brigade Lakecrest – Luxury Apartments in KR Puram, Bengaluru
            </p>
            <p className="mt-2">
              6 acre, G+28 high‑rise project
            </p>

            <ul className="mt-4 text-left list-disc list-inside space-y-1">
              
              <li><strong>1, 2, 2.5, 3 BHK Vastu‑compliant homes</strong></li>
              <li><strong>73 % carpet efficiency</strong></li>
              <li><strong>80 % open space with lake views</strong></li>
              <li><strong>Excellent connectivity: Old Madras Road, KR-Puram station, new metro</strong> </li>  
            <li><strong>Ready by 2025, full completion 2030</strong> </li>  

              </ul>
          </div>

          {/* Enquire Now Button using the reusable Button component */}
          <Button
            text="Enquire Now!"
            className="mt-4"
            onClick={() => setContactModal(!contactmodal)}
          />
        </div>

        {/* Image Section */}
        <div className="hidden md:flex flex-col items-center">
          <img
            src={image}
            alt="Assetz Altitude"
            className="w-[400px] h-[350px] rounded-lg shadow-lg object-cover"
          />
        </div>
      </section>
    </div>
  );
};
