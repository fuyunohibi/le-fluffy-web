"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Notification from '../../components/shared/notification/notification';
import CheckIcon from '../../components/shared/icon/check-icon';

interface FormData {
    image: string;
    name: string;
    description: string;
    sex: string;
    age: string;
    type: string;
    reward?: string;


}

const defaultFormData: FormData = {
  image: "",
  name: "",
  description: "",
  sex: "",
  age: "",
  type: "",
  reward: "",
};

const PostingPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(defaultFormData);
    const [notification, setNotification] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        setFormData(defaultFormData);
        setNotification(true);

        setTimeout(() => {
          setNotification(false);
        }, 3000);
    };

    return (
        <section className='min-h-screen mb-16 pt-16'>
            <div className="bg-white bg-opacity-10 p-8">
                <div className="mb-6">
                    <h1 className="text-4xl font-bold text-gray-800">Post A New Fluffy</h1>
                </div>
                <form className="max-w-xl" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-600">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            id="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 rounded-md 
                            focus:border-blue-500 focus:ring focus:ring-blue-200 
                            border-none bg-gray-100"
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1  rounded-md 
                            focus:border-blue-500 focus:ring focus:ring-blue-200 border-none bg-gray-100"
                            placeholder="Milo"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1  rounded-md 
                            focus:border-blue-500 focus:ring focus:ring-blue-200
                            border-none bg-gray-100"
                            rows={4}
                            placeholder="A happy-go-lucky Labrador Retriever with a love for water."
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="sex" className="block text-sm font-medium text-gray-600">Sex</label>
                        <select
                            name="sex"
                            id="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1  rounded-md 
                            focus:border-blue-500 focus:ring focus:ring-blue-200
                            border-none bg-gray-100"
                            required
                        >
                            <option value="">Select sex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="age" className="block text-sm font-medium text-gray-600">Age</label>
                        <input
                            type="text"
                            name="age"
                            id="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 rounded-md 
                            focus:border-blue-500 focus:ring focus:ring-blue-200
                            border-none bg-gray-100"
                            placeholder="2.5 years"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="type" className="block text-sm font-medium text-gray-600">Type</label>
                        <input
                            type="text"
                            name="type"
                            id="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 rounded-md 
                            focus:border-blue-500 focus:ring focus:ring-blue-200
                            border-none bg-gray-100"
                            placeholder="Dog"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="reward" className="block text-sm font-medium text-gray-600">Reward</label>
                        <input
                            type="text"
                            name="reward"
                            id="reward"
                            value={formData.reward}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 rounded-md 
                            focus:border-blue-500 focus:ring focus:ring-blue-200
                            border-none bg-gray-100"
                            placeholder="A big hug"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <Notification visible={notification} icon={<CheckIcon/>}/>
        </section>
        
    );
};

export default PostingPage;
