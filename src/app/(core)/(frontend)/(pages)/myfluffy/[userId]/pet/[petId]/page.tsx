"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";
import { IconGenderMale, IconGenderFemale } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import MapTilerMap from "@/app/(core)/(frontend)/components/shared/map/only-map";

interface PetLocation {
  latitude: number;
  longitude: number;
}

interface IParams {
  searchParams: {
    petId: string;
    petImage: string;
    petName: string;
    petReward?: number;
    petDescription: string;
    petSex: "Male" | "Female";
    petAge: number;
    petSpecies: string;
    petStatus: "MISSING" | "REPORTED" | "RETURNED";
    petContact?: string;
    petLocation: PetLocation | null;
  };
}

const HomePage = ({ searchParams }: IParams) => {
  const {
    petId,
    petImage,
    petName,
    petDescription,
    petSex,
    petAge,
    petSpecies,
    petReward,
    petStatus,
    petContact,
    petLocation: petLocationStr,
  } = searchParams;

  const router = useRouter();
  const [petLocation, setPetLocation] = useState<PetLocation | null>(null);
  const [showThankYouBox, setShowThankYouBox] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (petLocationStr) {
      try {
        const location = typeof petLocationStr === 'string' ? JSON.parse(petLocationStr) : petLocationStr;
        setPetLocation(location);
      } catch (error) {
        console.error("Failed to parse petLocation:", error);
        setPetLocation(null);
      }
    } else {
      setPetLocation(null);
    }
  }, [petLocationStr]);

  
  const petSexIconMap = {
    Male: <IconGenderMale className="inline-block ml-2 text-blue-500" />,
    Female: <IconGenderFemale className="inline-block ml-2 text-pink-500" />,
  };

  const handleReturn = () => {
    setShowThankYouBox(true);
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the post for ${petName}?`
    );
    if (confirmed) {
      setIsDeleting(true);
      try {
        const response = await fetch(`/api/posts/${petId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert(`${petName} has been deleted.`);
          router.push("/");
        } else {
          console.error("Failed to delete the post.");
        }
      } catch (err) {
        console.error("Error deleting the post:", err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const renderMissingStatus = () => {
    const buttonText = petSex === "Male" ? "I found him!" : "I found her!";
    const buttonColorClass =
      petSex === "Male" ? "bg-blue-500 hover:bg-blue-600" : "bg-pink-500 hover:bg-pink-600";

    return (
      <div className="flex flex-col justify-between items-center">
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold text-gray-800 text-left">
            {petName}
            {petSexIconMap[petSex]}
          </h1>
          <p className="text-gray-600 text-lg">{petDescription}</p>
          <div className="flex flex-row items-center justify-between">
            <p className="text-gray-600 text-lg">
              <span className="font-bold">Type:</span> {petSpecies}
            </p>
            <p className="text-gray-600 text-lg">
              <span className="font-bold">Age:</span> {petAge} years old
            </p>
          </div>
        </div>
        <button
          onClick={handleReturn}
          className={`${buttonColorClass} text-white font-bold rounded-2xl p-4 w-full transition-all duration-300 ease-in-out hover:scale-105`}
        >
          <p className="flex flex-row items-center justify-center">
            <Heart className="mr-2" />
            <span className="text-lg">{buttonText}</span>
          </p>
        </button>
      </div>
    );
  };

  const renderReportedStatus = () => (
    <div className="flex flex-col justify-between items-center">
      <h1 className="text-4xl font-bold text-gray-800 text-left">
        {`${petName} was found!`}
      </h1>
      <p className="text-lg text-gray-600">Reported by: {petContact}</p>
      {petLocation ? (
        <div>
          <p className="text-lg text-gray-600">
            Location: Latitude {petLocation.latitude}, Longitude {petLocation.longitude}
          </p>
          <MapTilerMap
            key={`${petLocation.latitude}-${petLocation.longitude}`} // Ensure map updates with new location
            latitude={petLocation.latitude}
            longitude={petLocation.longitude}
          />
        </div>
      ) : (
        <p>No location available.</p>
      )}
      <button
        onClick={handleReturn}
        className="bg-green-500 text-white font-bold rounded-2xl p-4 w-full mt-4 transition-all duration-300 ease-in-out hover:bg-green-600"
      >
        <p className="flex flex-row items-center justify-center">
          <Heart className="mr-2" />
          <span className="text-lg">Mark as Returned</span>
        </p>
      </button>
    </div>
  );

  const renderReturnedStatus = () => (
    <div className="flex flex-col justify-between items-center">
      <h1 className="text-4xl font-bold text-green-600">{`${petName} has returned home!`}</h1>
      <p className="text-lg text-gray-600 mt-4">No action required.</p>
    </div>
  );

  const renderThankYouBox = () => (
    <div className="flex flex-col items-center justify-center p-8 bg-green-100 border border-green-500 rounded-lg">
      <h1 className="text-4xl font-bold text-green-600">Thank You!</h1>
      <p className="text-lg text-gray-600 mt-4">
        {`Thank you for updating ${petName}'s status.`}
      </p>
      <p className="text-lg text-gray-500 mt-2">Redirecting to homepage...</p>
    </div>
  );

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
      <div className="glassmorphism flex flex-row p-8 gap-6 w-[60rem] relative">
        <Image
          src={petImage}
          alt={petName}
          key={petImage} // Ensure image updates with new petImage
          width={400}
          height={400}
          className="rounded-lg"
        />
        {!showThankYouBox &&
          (petStatus === "MISSING"
            ? renderMissingStatus()
            : petStatus === "REPORTED"
            ? renderReportedStatus()
            : renderReturnedStatus())}
        {showThankYouBox && renderThankYouBox()}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
        >
          <Trash2 color={isDeleting ? "#888" : "#4B5563"} />
        </button>
      </div>
    </motion.div>
  );
};

export default HomePage;
