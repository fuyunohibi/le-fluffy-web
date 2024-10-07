"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; 
import { motion } from "framer-motion";
import { ParallaxScrollMyFluffy } from "../../../components/shared/card/parallax-scroll-my-fuffy";
import { PetInfo } from "../../../types";

const HomePage = () => {
  const [pets, setPets] = useState<PetInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession(); 

  useEffect(() => {
    
    if (status === "authenticated") {
      const fetchPets = async () => {
        try {
          const userId = session?.user.id;  
          const res = await fetch(`/api/pets/${userId}`);
          const data = await res.json();
          if (res.ok) {
            setPets(data.pets);
            console.log(data.pets);
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
    }
  }, [session, status]);

  if (loading) {
    return <div></div>; 
  }

  if (!session) {
    return <div>Please log in to view your pets</div>; 
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
      <h1 className="text-4xl font-bold text-center mb-8 text-black">
        My Fluffy
      </h1>

      <ParallaxScrollMyFluffy pets={pets} />
    </motion.div>
  );
};

export default HomePage;
