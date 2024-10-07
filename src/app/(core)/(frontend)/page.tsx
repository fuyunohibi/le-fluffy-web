"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ParallaxScroll } from "./components/shared/card/parallax-scroll";
import { PetInfo } from "./types";
import { CATEGORIES_IMAGES, PET_CATEGORIES } from "./constants";
import MOCK_PETS_DATA from "./constants/mocks/mock-pets-data";

const HomePage = () => {
  const [pets, setPets] = useState<PetInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch("/api/pets");
        const data = await res.json();
        if (res.ok) {
          setPets(data.pets);
        } else {
          console.error("Failed to fetch pets:", data.message);
        }
      } catch (err) {
        console.error("Error fetching pets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const handleCategoryClick = (species: string) => {
    setSelectedSpecies(species); 
  };

  const handleReset = () => {
    setSelectedSpecies(null); 
  };


  const filteredPets = selectedSpecies
    ? pets.filter((pet) => pet.species === selectedSpecies)
    : pets;

  if (loading) {
    return (
      <div className="flex flex-1 justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

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
      <div className="flex flex-col justify-center items-center pb-6 gap-8 w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-black">
          Where&apos;s My Fluffy 🔎
        </h1>
        <div className="flex flex-row justify-between items-center w-[70rem] mb-10">
          <p className="text-2xl font-extrabold text-black">Categories</p>
          {selectedSpecies && (
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
          >
            Reset
          </button>
        )}
        </div>

        <div className="flex flex-row justify-center items-center gap-10">
          {CATEGORIES_IMAGES.map((image, idx) => {
            const petSpecies = PET_CATEGORIES[idx];
            let colorClasses;

            switch (petSpecies) {
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
                colorClasses = "bg-gray-100 border-gray-200"; 
            }

            return (
              <motion.div
                key={"images" + idx}
                onClick={() => handleCategoryClick(petSpecies)}
                style={{
                  rotate: Math.random() * 30 - 10,
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
                className={`rounded-xl p-2 bg-white flex-shrink-0 overflow drop-shadow-lg cursor-pointer ${
                  selectedSpecies === petSpecies ? "border-4 border-black" : ""
                }`}
              >
                <div
                  className={`absolute -top-[1.5rem] left-[4.2rem] rounded-full p-5 ${colorClasses} border-2`}
                ></div>
                <Image
                  src={image}
                  alt={`${petSpecies} image`}
                  width="500"
                  height="700"
                  className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                />
                <p className="text-sm font-bold text-gray-900 mt-2">
                  {PET_CATEGORIES[idx]}s
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
      <ParallaxScroll pets={filteredPets} />
    </motion.div>
  );
};

export default HomePage;
