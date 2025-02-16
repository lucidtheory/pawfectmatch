export type GetDogBreedsResponse = string[];

export interface SearchDogBreedsParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: string;
  from?: number;
  sort?: string;
}

export interface SearchDogBreedsResponse {
  resultIds: string[];
  total: number;
  next: string;
  prev: string;
}

export type MatchDogsParams = string[];

export interface MatchDogsResonse {
  match: string;
}

export type PostGetDogsParams = string[];

export interface Dog {
  id: string;
  img: string;
  name: string;
  breed: string;
  age: number;
}

export type PostGetDogsResponse = Dog[];
