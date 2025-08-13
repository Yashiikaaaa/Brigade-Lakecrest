import React, { useState, useEffect } from "react";
import Button from "../components/button/buttonMain";
import homeLocation from "../assets/home/location.svg";
import ReactGA from "react-ga4"; // Google Analytics 4
// Array of banner images
import banner1 from "../assets/gallery/crest1.jpg";
import banner2 from "../assets/home/2.jpg";
import banner4 from "../assets/home/1.jpg";
import banner3 from "../assets/gallery/1.webp";
import { useLeadTracking, LEAD_SOURCES } from '../hooks/useLeadTracking';

const banners = [banner1, banner2,banner4];

// Import environment variables
const trackingId = import.meta.env.VITE_GA_MEASUREMENT_ID;

if (trackingId) {
  ReactGA.initialize(trackingId);
}

export const Home = ({ openContactModal }) => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const { trackButtonClick } = useLeadTracking();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    backgroundImage: `url(${banners[currentBanner]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "background-image 1s ease-in-out",
  };

  return (
    <div
      id="Home"
      className="w-full h-[30rem] min-h-[98vh] sm:min-h-[85vh] mt-14 md:mt-[4.5rem]"
      style={containerStyle}
    >
      <div className="relative flex flex-col justify-center h-full w-full items-center gap-8 bg-black bg-opacity-40 p-5 md:px-10 lg:px-[7.5rem]">
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left gap-6 text-white">
          <h1 className="font-subheading text-3xl md:text-6xl font-semibold uppercase">
            Brigade Lakecrest
          </h1>
          <p className="font-body text-sm md:text-2xl font-normal">
            Premium Township in KR Puram, Bengaluru
          </p>

          <Button
            text="Enquire Now!"
            onClick={() => {
              trackButtonClick(
                LEAD_SOURCES.HERO,
                "enquire_now",
              );
              openContactModal(LEAD_SOURCES.HERO);
            }}
          />
        </div>

        <div className="absolute bottom-4 right-4 flex gap-2 items-center bg-white px-3 py-2 rounded">
          <img src={homeLocation} alt="Location" className="h-4 md:h-6" />
          <p className="font-body text-xs md:text-base font-medium">
            Old Madras Road
          </p>
        </div>
      </div>
    </div>
  );
};