"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ParallaxScrollMyFluffy } from "../../../components/shared/card/parallax-scroll-my-fuffy";
import MOCK_PETS_DATA from "../../../constants/mocks/mock-my-fluffy";
import { CATEGORIES_IMAGES, PET_CATEGORIES } from "../../../constants";
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
        My Fluffy
      </h1>
      <ParallaxScrollMyFluffy pets={MOCK_PETS_DATA} />
    </motion.div>
  );
};

export default HomePage;
