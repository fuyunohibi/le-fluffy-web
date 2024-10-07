"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { IconGenderMale, IconGenderFemale } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import SearchBox from "../../../components/shared/searchbox/search-box";
import Maps from "../../../components/shared/map/map";
import { Position } from "../../../types"; 
interface IParams {
  searchParams: {
    petId: string;
    petImage: string;
    petName: string;
    petDescription: string;
    petSex: "Male" | "Female";
    petAge: string;
    petSpecies: string;
    petReward: number;
  };
}

interface FormData {
  contact: string;
  location: string;
}

const defaultFormData: FormData = {
  contact: "",
  location: "",
};


const PetInformationPage = ({ searchParams }: IParams) => {
  const { petName, petImage, petDescription, petSex, petAge, petSpecies, petReward } =
    searchParams;

  const router = useRouter();

  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [showThankYouBox, setShowThankYouBox] = useState(false);
  const [selectPosition, setSelectPosition] = useState<Position | null>(null);
  
  const petSexIconMap = {
    Male: <IconGenderMale className="inline-block ml-2 text-blue-500" />,
    Female: <IconGenderFemale className="inline-block ml-2 text-pink-500" />,
  };

  const buttonStyles = {
    Male: "bg-blue-500 hover:bg-blue-600",
    Female: "bg-pink-500 hover:bg-pink-600",
  };

  const handleButtonClick = () => {
    setShowContactForm(true);
  };

  const handleCancelClick = () => {
    setShowContactForm(false);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    if (selectPosition) {
      const { lat, lon } = selectPosition;
      console.log("Latitude:", lat, "Longitude:", lon);

      try {
        const response = await fetch(`/api/pets/${searchParams.petId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contact: formData.contact,
            location: {
              latitude: lat,
              longitude: lon,
            },
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update pet status");
        }

        const updatedPet = await response.json();
        console.log("Pet updated successfully:", updatedPet);

        setShowThankYouBox(true);
        setShowContactForm(false);

        // Redirect after a timeout
        setTimeout(() => {
          setFormData(defaultFormData);
          router.push("/");
        }, 3000);
      } catch (error) {
        console.error("Error updating pet status:", error);
      }
    } else {
      console.log("No location selected.");
    }
  };


  const renderPetSexButton = () => {
    const isMale = petSex === "Male";
    const buttonText = isMale ? "I found him!" : "I found her!";
    const colorClass = buttonStyles[petSex] || "bg-gray-500 hover:bg-gray-600";

    return (
      <button
        onClick={handleButtonClick}
        className={`${colorClass} text-white font-bold rounded-2xl p-4 w-full transition-all duration-300 ease-in-out hover:scale-105`}
      >
        <p className="flex flex-row items-center justify-center">
          <Heart className="mr-2" />
          <span className="text-lg">{buttonText}</span>
        </p>
      </button>
    );
  };

  const renderThankYouBox = () => (
    <div className="flex flex-col items-center justify-center p-8 bg-green-100 border border-green-500 rounded-lg">
      <h1 className="text-4xl font-bold text-green-600">Thank You for Helping!</h1>
      <p className="text-lg text-gray-600 mt-4">
        We’ve received your information. We&apos;ll contact you at{" "}
        <strong>{formData.contact}</strong> and meet at{" "}
        <strong>{formData.location}</strong>.
      </p>
      <p className="text-lg text-gray-500 mt-2">Redirecting to homepage...</p>
    </div>
  );

  const renderPetInformationForm = () => (
    <div className="flex flex-col justify-between items-center">
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold text-gray-800 text-left">
          {petName}
          {petSexIconMap[petSex] || null}
        </h1>
        <p className="text-gray-600 text-lg">{petDescription}</p>
        <div className="flex flex-row items-center justify-between">
          <p className="text-gray-600 text-lg">
            <span className="font-bold">Type:</span> {petSpecies}
          </p>
          <p className="text-gray-600 text-lg">
            <span className="font-bold">Age:</span> {petAge} old
          </p>
        </div>
        <div>
          <p className="text-gray-600 text-lg">
            <span className="font-bold">Rewards:</span> {petReward}
          </p>
        </div>
      </div>
      {renderPetSexButton()}
    </div>
  );

  const renderContactForm = () => (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col space-y-6">
      <h1 className="text-4xl font-bold text-gray-800 text-left">{`Where is ${petName}?`}</h1>
      <input
        type="text"
        name="contact"
        placeholder="Your Contact (Phone Number, Email, etc.)"
        className="border p-2 rounded-2xl w-full"
        value={formData.contact}
        onChange={handleTextChange}
      />
      <p className="text-gray-600 text-lg">
        <span className="font-bold">Location:</span> {formData.location}
      </p>

      <div className=" min-h-[10rem]">
          <Maps selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
      </div>
      <div>
          <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition}/>
      </div>
      

      <div className="flex justify-between mt-4 gap-3">
        <button
          type="button"
          onClick={handleCancelClick}
          className="bg-white rounded-2xl px-4 py-3 w-full transition-all duration-300 ease-in-out hover:bg-gray-100"
        >
          <p className="text-black font-bold text-md">Cancel</p>
        </button>
        <button
          type="submit"
          className="bg-blue-500 rounded-2xl px-4 py-3 w-full transition-all duration-300 ease-in-out hover:bg-blue-600"
        >
          <p className="text-white font-bold text-md">Send</p>
        </button>
      </div>
    </form>
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
      <div className="glassmorphism flex flex-row p-8 gap-6 w-[60rem]">
        <Image
          src={petImage}
          alt={petName}
          width={400}
          height={400}
          className="rounded-lg"
        />
        {!showContactForm && !showThankYouBox
          ? renderPetInformationForm()
          : null}
        {showContactForm && !showThankYouBox ? renderContactForm() : null}
        {showThankYouBox && renderThankYouBox()}
      </div>
    </motion.div>
  );
};

export default PetInformationPage;
