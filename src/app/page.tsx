import React from 'react';

const dogData = [
  { name: '[Dog Name]', image: '/api/placeholder/200/200', description: '[Dog Name]' },
  { name: '[Dog Name]', image: '/api/placeholder/200/200', description: '[Dog Name]' },
  { name: '[Dog Name]', image: '/api/placeholder/200/200', description: '[Dog Name]' },
  { name: '[Dog Name]', image: '/api/placeholder/200/200', description: '[Dog Name]' },
  { name: '[Dog Name]', image: '/api/placeholder/200/200', description: '[Dog Name]' },
  { name: '[Dog Name]', image: '/api/placeholder/200/200', description: '[Dog Name]' },
  { name: '[Dog Name]', image: '/api/placeholder/200/200', description: '[Dog Name]' },
  { name: '[Dog Name]', image: '/api/placeholder/200/200', description: '[Dog Name]' },
];

const PawIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
);

const Page = () => {
  return (
    <div className="min-h-screen bg-stone-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <PawIcon />
            <span className="ml-2 text-xl font-semibold text-gray-900">Fluffy</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Where's My Fluffy?</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dogData.map((dog, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={dog.image} alt={dog.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">{dog.name}</h2>
                <p className="text-sm text-gray-600">{dog.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
            Post a Pet
          </button>
        </div>
      </main>
    </div>
  );
};

export default Page;