"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ParallaxScroll } from "./components/shared/card/parallax-scroll";
import MOCK_PETS_DATA from "./constants/mocks/mock-pets-data";
import { PET_CATEGORIES } from "./constants";
import { Heart } from 'lucide-react';

const HomePage = () => {
  const images = [
    "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="flex flex-1 flex-col gap-4 items-center justify-center p-20 "
    >
      <h1 className="text-4xl font-bold text-center mb-8 text-black">
        Where's My Fluffy?
      </h1>
      <p className="text-xl font-extrabold text-black">Categories</p>
      <div className="flex justify-center items-center pb-6">
        {images.map((image, idx) => {
          let petType = PET_CATEGORIES[idx];
          let colorClasses;

          switch (petType) {
            case "Dog":
              colorClasses = "bg-blue-100 border-blue-200";
              break;
            case "Cat":
              colorClasses = "bg-pink-100 border-pink-200";
              break;
            case "Bird":
              colorClasses = "bg-cream-100 border-cream-200";
              break;
            case "Rabbit":
              colorClasses = "bg-green-100 border-green-200";
              break;
            case "Reptile":
              colorClasses = "bg-teal-100 border-teal-200";
              break;
            default:
              colorClasses = "bg-gray-100 border-gray-200"; // Fallback
          }

          return (
            <motion.div
              key={"images" + idx}
              style={{
                rotate: Math.random() * 20 - 10,
              }}
              whileHover={{
                scale: 1.1,
                rotate: 0,
                zIndex: 100,
              }}
              whileTap={{
                scale: 1.1,
                rotate: 0,
                zIndex: 100,
              }}
              className={`rounded-xl -mr-4 mt-4 p-1 ${colorClasses} flex-shrink-0 overflow-hidden`}
            >
              <Image
                src={image}
                alt="bali images"
                width="500"
                height="500"
                className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
              />
              <p className="text-sm font-semibold text-gray-900">
                {PET_CATEGORIES[idx]}s
              </p>
            </motion.div>
          );
        })}
      </div>

      <ParallaxScroll pets={MOCK_PETS_DATA} />
    </motion.div>
  );
};

export default HomePage;

// const PawIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//     <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
//   </svg>
// );

