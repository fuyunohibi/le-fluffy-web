"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { PetInfo } from "../../../types";

interface IParams {
  params: {
    id: string
  }
}

const HomePage = ({ params }: IParams) => {
  console.log("PET ID:", params.id);
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
        Where's ID:{params.id}?
      </h1>
    </motion.div>
  );
};

export default HomePage;
