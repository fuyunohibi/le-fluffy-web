"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ParallaxScroll } from "./components/shared/card/parallax-scroll";
import MOCK_PETS_DATA from "./constants/mocks/mock-my-fluffy";
import { CATEGORIES_IMAGES, PET_CATEGORIES } from "./constants";
import { Heart } from 'lucide-react';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="flex flex-1 flex-col gap-4 items-center justify-center p-20 pt-24"
    >
      <h1 className="text-4xl font-bold text-center mb-8 text-black">
        Where's My Fluffy?
      </h1>
      <p className="text-xl font-extrabold text-black">Categories</p>
      <div className="flex justify-center items-center pb-6">
        {CATEGORIES_IMAGES.map((image, idx) => {
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
