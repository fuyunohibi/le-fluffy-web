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
