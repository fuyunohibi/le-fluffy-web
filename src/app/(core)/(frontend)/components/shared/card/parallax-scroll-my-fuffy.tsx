"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "../../../utils";
import { PetInfo } from "../../../types";
import Link from "next/link";




const colorScheme: Record<string, { bg: string; border: string }> = {
  Dog: { bg: "bg-blue-100", border: "border-blue-200" },
  Cat: { bg: "bg-pink-100", border: "border-pink-200" },
  Bird: { bg: "bg-cream-100", border: "border-cream-200" },
  Rabbit: { bg: "bg-green-100", border: "border-green-200" },
};

// Function to determine status styling
const getStatusColor = (status: string) => {
  switch (status) {
    case "MISSING":
      return "text-red-500"; // Red for Missing status
    case "REPORTED":
      return "text-yellow-500"; // Yellow for Reported status
    case "FOUND":
      return "text-green-500"; // Green for Returned status
    default:
      return "text-gray-500"; // Default gray
  }
};

export const ParallaxScrollMyFluffy = ({
  pets,
  className,
}: {
  pets: PetInfo[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const userId = "yourUserId"; 
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(pets.length / 3);

  const firstPart = pets.slice(0, third);
  const secondPart = pets.slice(third, 2 * third);
  const thirdPart = pets.slice(2 * third);

  return (
    <div
      className={cn(
        "h-[40rem] items-start overflow-y-auto w-full no-scrollbar",
        className
      )}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-[120rem] mx-auto gap-10 pt-10 pb-40 px-10"
        ref={gridRef}
      >
        <div className="grid gap-10">
          {firstPart.map((pet, idx) => (
            <motion.div
              style={{ y: translateFirst }}
              key={"grid-1" + idx}
              className="p-6 rounded-lg shadow-lg glassmorphism"
            >
              <Link
                href={{
                    pathname: `/myfluffy/${userId}/pet/${pet.id}`,
                  query: {
                    petId: pet.id,
                    petImage: pet.photo,
                    petName: pet.name,
                    petDescription: pet.description,
                    petSex: pet.sex,
                    petAge: pet.age,
                    petSpecies: pet.species,
                    petReward: pet.reward,
                    petStatus: pet.status,
                    petContact: pet.contact,
                    petLocation: pet.location ? JSON.stringify(pet.location) : null,
                  },
                }}
              >
                <Image
                  src={pet.photo}
                  className="h-80 w-full object-cover object-left-top rounded-lg mb-4"
                  height="400"
                  width="400"
                  alt={pet.name}
                />
                <h2 className="text-2xl font-bold text-gray-800">{pet.name}</h2>
                <p className="text-gray-600">{pet.description}</p>
                <p className="text-gray-600">
                  <span className="font-semibold">Sex:</span> {pet.sex}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Age:</span> {pet.age}
                </p>
                {/* Status */}
                <p className={getStatusColor(pet.status)}>
                  <span className="font-semibold">Status:</span> {pet.status}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-10">
          {secondPart.map((pet, idx) => (
            <motion.div
              style={{ y: translateSecond }}
              key={"grid-2" + idx}
              className="p-6 rounded-lg shadow-lg glassmorphism"
            >
              <Link
                href={{
                    pathname: `/myfluffy/${userId}/pet/${pet.id}`,
                  query: {
                    petId: pet.id,
                    petImage: pet.photo,
                    petName: pet.name,
                    petDescription: pet.description,
                    petSex: pet.sex,
                    petAge: pet.age,
                    petSpecies: pet.species,
                    petReward: pet.reward,
                    petStatus: pet.status,
                    petContact: pet.contact,
                    petLocation: pet.location ? JSON.stringify(pet.location) : null,

                  },
                }}
              >
                <Image
                  src={pet.photo}
                  className="h-80 w-full object-cover object-left-top rounded-lg mb-4"
                  height="400"
                  width="400"
                  alt={pet.name}
                />
                <h2 className="text-2xl font-bold text-gray-800">{pet.name}</h2>
                <p className="text-gray-600">{pet.description}</p>
                <p className="text-gray-600">
                  <span className="font-semibold">Sex:</span> {pet.sex}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Age:</span> {pet.age}
                </p>
                {/* Status */}
                <p className={getStatusColor(pet.status)}>
                  <span className="font-semibold">Status:</span> {pet.status}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-10">
          {thirdPart.map((pet, idx) => (
            <motion.div
              style={{ y: translateThird }}
              key={"grid-3" + idx}
              className="p-6 rounded-lg shadow-lg glassmorphism"
            >
              <Link
                href={{
                  pathname: `/myfluffy/${userId}/pet/${pet.id}`,
                  query: {
                    petId: pet.id,
                    petImage: pet.photo,
                    petName: pet.name,
                    petDescription: pet.description,
                    petSex: pet.sex,
                    petAge: pet.age,
                    petSpecies: pet.species,
                    petReward: pet.reward,
                    petStatus: pet.status,
                    petContact: pet.contact,
                    petLocation: pet.location ? JSON.stringify(pet.location) : null,

                  },
                }}
              >
                <Image
                  src={pet.photo}
                  className="h-80 w-full object-cover object-left-top rounded-lg mb-4"
                  height="400"
                  width="400"
                  alt={pet.name}
                />
                <h2 className="text-2xl font-bold text-gray-800">{pet.name}</h2>
                <p className="text-gray-600">{pet.description}</p>
                <p className="text-gray-600">
                  <span className="font-semibold">Sex:</span> {pet.sex}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Age:</span> {pet.age}
                </p>
                {/* Status */}
                <p className={getStatusColor(pet.status)}>
                  <span className="font-semibold">Status:</span> {pet.status}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
