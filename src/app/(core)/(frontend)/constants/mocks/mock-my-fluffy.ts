const MOCK_PETS_DATA = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8",
    name: "Bella",
    description:
      "Friendly and playful Golden Retriever who loves outdoor activities.",
    sex: "Female",
    age: "2 years",
    type: "Dog",
    status: "Returned",
    rewards: "No reward", // No reward offered since pet is returned
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1603302827894-4b52a956c1d8",
    name: "Coco",
    description: "A calm and friendly Cockatiel with beautiful feathers.",
    sex: "Female",
    age: "2 years",
    type: "Bird",
    status: "Missing",
    rewards: "$100 for safe return", // Reward offered for finding Coco
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1572357606969-04ebccdeb231",
    name: "Thumper",
    description: "An adorable and active rabbit who loves hopping around.",
    sex: "Male",
    age: "1 year",
    type: "Rabbit",
    status: "Reported",
    contact: "john.doe@example.com",
    location: "123 Rabbit Lane, Bunny Town",
    rewards: "$50 for returning to the owner", // Reward offered for reporting Thumper
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1560807707-8cc77767d783",
    name: "Rocky",
    description:
      "Strong and loyal Rottweiler, great for guarding and companionship.",
    sex: "Male",
    age: "3 years",
    type: "Dog",
    status: "Missing",
    rewards: "$200 for finding Rocky", // Reward for finding Rocky
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1555685812-4b74353e02ec",
    name: "Max",
    description: "A calm and gentle German Shepherd, great for families.",
    sex: "Male",
    age: "4 years",
    type: "Dog",
    status: "Returned",
    rewards: "", // No reward since Max has already returned
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1602451295309-6935a27b4a9a",
    name: "Jasper",
    description: "A relaxed and friendly Ball Python with beautiful scales.",
    sex: "Male",
    age: "5 years",
    type: "Reptile",
    status: "Reported",
    contact: "snake.lover@example.com",
    location: "456 Serpent Road, Python City",
    rewards: "$75 for safe return", // Reward for reporting Jasper
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006",
    name: "Luna",
    description:
      "Curious and adventurous Siamese cat with a love for high places.",
    sex: "Female",
    age: "3 years",
    type: "Cat",
    status: "Missing",
    rewards: "$150 for finding Luna", // Reward for finding Luna
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1603200325362-e0e45da0ed60",
    name: "Oliver",
    description: "A gentle and playful Maine Coon who loves the outdoors.",
    sex: "Male",
    age: "5 years",
    type: "Cat",
    status: "Reported",
    contact: "oliver.owner@example.com",
    location: "789 Cat Street, Purrville",
    rewards: "$100 for safe return", // Reward for finding Oliver
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1592194996308-d1ba14d9c0e8",
    name: "Charlie",
    description: "An energetic Beagle who enjoys playing fetch.",
    sex: "Male",
    age: "2.5 years",
    type: "Dog",
    status: "Missing",
    rewards: "$250 for finding Charlie", // Reward for finding Charlie
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    name: "Daisy",
    description: "A lovely and calm Persian cat with a fluffy coat.",
    sex: "Female",
    age: "4 years",
    type: "Cat",
    status: "Returned",
    rewards: "No reward", // No reward since pet is returned
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd",
    name: "Buddy",
    description: "A loyal Golden Retriever who loves swimming.",
    sex: "Male",
    age: "3 years",
    type: "Dog",
    status: "Missing",
    rewards: "$300 for safe return", // Reward for finding Buddy
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938",
    name: "Milo",
    description: "A curious and playful ferret who enjoys exploring.",
    sex: "Male",
    age: "1 year",
    type: "Ferret",
    status: "Reported",
    contact: "milo.rescuer@example.com",
    location: "456 Ferret Lane, Fuzzville",
    rewards: "$40 for safe return", // Reward for reporting Milo
  },
];

export default MOCK_PETS_DATA;
