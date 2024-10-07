"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Notification from "../../components/shared/notification/notification";
import CheckIcon from "../../components/shared/icon/check-icon";
import FailedNotification from "../../components/shared/notification/failed-notification";
import XMarkIcon from "../../components/shared/icon/x-mark-icon";
import { BackgroundGradient } from "../../components/shared/card/background-gradient";
import { useRouter } from "next/navigation";

interface FormData {
  image: string;
  name: string;
  description: string;
  sex: string;
  age: string;
  species: string;
  reward?: string;
}

const defaultFormData: FormData = {
  image: "",
  name: "",
  description: "",
  sex: "",
  age: "0", 
  species: "",
  reward: "0"
};

const PostingPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [notification, setNotification] = useState(false);
  const [failedNotification, setFailedNotification] = useState(false);

  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "age" || name === "reward") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formDataToSubmit = {
      ...formData,
      age: parseFloat(formData.age) || 0,
      reward: parseFloat(formData.reward) || 0,
    };

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formDataToSubmit.name,
          species: formDataToSubmit.species,
          sex: formDataToSubmit.sex,
          age: formDataToSubmit.age,
          description: formDataToSubmit.description,
          reward: formDataToSubmit.reward,
          photo: formDataToSubmit.image,
          status: "MISSING",
          userId: 1,
        }),
      });

      if (response.ok) {
        setNotification(true);
        setFormData(defaultFormData);

        setTimeout(() => {
          setNotification(false);
        }, 3000);

        router.push("/");
      } else {
        setFailedNotification(true);
        setTimeout(() => {
          setFailedNotification(false);
        }, 3000);
      }
    } catch (error) {
      setFailedNotification(true);
      setTimeout(() => {
        setFailedNotification(false);
      }, 3000);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center ">
      <BackgroundGradient className="bg-white p-10 rounded-3xl shadow-lg w-[60rem] mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Post your missing pet 🐈
          </h1>
          <p className="text-gray-600 mt-3">
            Help us find your missing pet by posting their details here.
          </p>
        </div>
        <form
          className="space-y-6 flex flex-col justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between items-start space-x-10">
            <div className="w-full">
              <div className="relative mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  id="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-full shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 bg-gray-100"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-full shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 bg-gray-100"
                  placeholder="Milo"
                  required
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-2xl shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 bg-gray-100"
                  rows={4}
                  placeholder="A happy-go-lucky Labrador Retriever with a love for water."
                  required
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="sex"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Sex
                </label>
                <select
                  name="sex"
                  id="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-full shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 bg-gray-100"
                  required
                >
                  <option value="">Select sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="w-full">
              <div className="relative mb-4">
                <label
                  htmlFor="age"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Age
                </label>
                <input
                  type="number"
                  step="any"
                  name="age"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-full shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 bg-gray-100"
                  placeholder="2.5"
                  required
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="species"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Species
                </label>
                <input
                  type="text"
                  name="species"
                  id="species"
                  value={formData.species}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-full shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 bg-gray-100"
                  placeholder="Dog"
                  required
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="reward"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Reward
                </label>
                <input
                  type="number"
                  step="any"
                  name="reward"
                  id="reward"
                  min="0"
                  value={formData.reward}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-full shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 bg-gray-100"
                  placeholder="5000 bath"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Post
          </button>
        </form>
      </BackgroundGradient>
      <Notification visible={notification} icon={<CheckIcon />} />
      <FailedNotification visible={failedNotification} icon={<XMarkIcon />} />
    </section>
  );
};

export default PostingPage;
