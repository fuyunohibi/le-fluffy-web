import NextAuth from "next-auth";

export interface PetInfo {
  rewards: string | number | boolean | readonly string[] | readonly number[] | readonly boolean[] | null | undefined;
  contact: string | number | boolean | readonly string[] | readonly number[] | readonly boolean[] | null | undefined;
  location: string | number | boolean | readonly string[] | readonly number[] | readonly boolean[] | null | undefined;
  status: string;
  status(status: any): string | undefined;
  id: string;
  image: string;
  name: string;
  description: string;
  sex: "Male" | "Female";
  age: string;
  type: string;
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