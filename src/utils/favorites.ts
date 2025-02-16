import { Dog } from "store/services/types/dogs";

export const FAVORITES_STORAGE_KEY = "favorites";

export const getFavoriteDogs = (): Dog[] =>
  JSON.parse(sessionStorage.getItem(FAVORITES_STORAGE_KEY) || "[]");
export const getFavoriteDogIds = () => getFavoriteDogs().map((dog) => dog.id);
export const isDogFavorite = (id: string) =>
  getFavoriteDogs().some((favorite) => favorite.id === id);

export const removeFavorite = (id: string) => {
  const favorites = getFavoriteDogs();
  const updatedFavorites = favorites.filter(
    (favorite: Dog) => favorite.id !== id,
  );

  sessionStorage.setItem(
    FAVORITES_STORAGE_KEY,
    JSON.stringify(updatedFavorites),
  );
};

export const addFavorite = (dog: Dog) => {
  const favorites = getFavoriteDogs();
  const updatedFavorites = [...favorites, dog];

  sessionStorage.setItem(
    FAVORITES_STORAGE_KEY,
    JSON.stringify(updatedFavorites),
  );
};

export const getFavoriteDog = (id?: string) =>
  getFavoriteDogs().find((dog) => dog.id === id);
