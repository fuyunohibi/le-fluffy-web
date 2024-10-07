"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "../../../utils";
import { PetInfo } from "../../../types";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

export const ParallaxScroll = ({
  pets,
  className,
}: {
  pets: PetInfo[];
  className?: string;
}) => {
  const gridRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  // Transformations
  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Calculate slices in useMemo to avoid recalculation
  const [firstPart, secondPart, thirdPart] = useMemo(() => {
    const third = Math.ceil(pets.length / 3);
    return [
      pets.slice(0, third),
      pets.slice(third, 2 * third),
      pets.slice(2 * third),
    ];
  }, [pets]);

  // Function to get species-based color classes
  const getColorClasses = (species: string) => {
    switch (species) {
      case "Dog":
        return "bg-blue-500 hover:bg-blue-600";
      case "Cat":
        return "bg-pink-500 hover:bg-pink-600";
      case "Bird":
        return "bg-cream-200 hover:bg-cream-100";
      case "Rabbit":
        return "bg-green-500 hover:bg-green-600";
      case "Reptile":
        return "bg-teal-500 hover:bg-teal-600";
      default:
        return "bg-gray-500 hover:bg-gray-600"; // Fallback
    }
  };

  // Extracted reusable component for rendering pet cards
  const PetCard = ({ pet, translate }: { pet: PetInfo; translate: any }) => {
    const buttonColorClass = pet.sex === "Male" ? "bg-blue-500" : "bg-pink-500";
    const colorClasses = getColorClasses(pet.species);

    return (
      <motion.div
        style={{ y: translate }}
        className="p-6 shadow-lg glassmorphism hover:shadow-2xl transition-all duration-200 ease-in-out"
        key={pet.id}
      >
        <Link
          href={{
            pathname: `/pets/${pet.id}`,
            query: { ...pet },
          }}
        >
          <Image
            src={pet.photo}
            className="h-80 w-full object-cover object-left-top rounded-[1rem] mb-4"
            height={400}
            width={400}
            alt={pet.name}
          />
          <h2 className="text-2xl font-bold text-gray-800">{pet.name}</h2>
          <p className="text-gray-600">{pet.description}</p>
          <div className="flex flex-row items-center justify-between mt-3">
            <div className="flex flex-row items-center justify-start gap-2">
              <div
                className={cn(
                  "flex justify-center items-center px-4 py-2 bg-gray-100 rounded-[3rem]",
                  buttonColorClass
                )}
              >
                <p className="text-white font-semibold">{pet.sex}</p>
              </div>
              <div className="flex justify-center items-center px-4 py-2 bg-gray-100 rounded-[3rem]">
                <p className="text-gray-600 font-semibold">{pet.age}</p>
              </div>
            </div>
            <button
              className={cn(
                "rounded-full drop-shadow-lg w-12 h-12 text-white flex justify-center items-center transition-all duration-300 ease-in-out hover:translate-x-1 hover:-translate-y-1",
                colorClasses
              )}
            >
              <IconArrowUpRight size={24} />
            </button>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <div
      className={cn(
        "h-[40rem] items-start overflow-y-auto w-full no-scrollbar",
        className
      )}
      ref={gridRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-[120rem] mx-auto gap-10 pt-10 pb-40 px-10">
        <div className="grid gap-10">
          {firstPart.map((pet) => (
            <PetCard pet={pet} translate={translateFirst} key={pet.id} />
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((pet) => (
            <PetCard pet={pet} translate={translateSecond} key={pet.id} />
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((pet) => (
            <PetCard pet={pet} translate={translateThird} key={pet.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
