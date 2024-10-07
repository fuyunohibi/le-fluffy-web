export interface PetInfo {
  reward: number;
  contact: string | number | boolean | readonly string[] | readonly number[] | readonly boolean[] | null | undefined;
  location: string | number | boolean | readonly string[] | readonly number[] | readonly boolean[] | null | undefined;
  status: string;
  id: string;
  photo: string;
  name: string;
  description: string;
  sex: "Male" | "Female";
  age: number;
  species: string;
}

export interface Position {
  lat: number;
  lon: number;
  display_name?: string;
  place_id?: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string; 
    username?: string | null;
    email?: string | null;
  }
}

