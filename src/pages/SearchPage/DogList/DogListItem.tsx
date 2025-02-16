import { FC, useState, useEffect, useCallback } from "react";
import { Dog } from "store/services/types/dogs";
import { addFavorite, isDogFavorite, removeFavorite } from "utils/favorites";

interface DogListItemProps {
  dog: Dog;
}

const DogListItem: FC<DogListItemProps> = ({ dog }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the dog is in sessionStorage when the component mounts
  useEffect(() => {
    setIsFavorite(isDogFavorite(dog.id));
  }, [dog.id]);

  const toggleFavorite = useCallback(() => {
    if (isFavorite) {
      removeFavorite(dog.id);
    } else {
      addFavorite(dog);
    }

    setIsFavorite(!isFavorite);
  }, [dog, isFavorite]);

  return (
    <div className="p-2 flex items-center border-b">
      <img
        src={dog.img}
        alt={dog.name}
        className="w-16 h-16 rounded-lg mr-4"
        style={{ height: 100, width: 100 }}
      />
      <div>
        <h3 className="font-semibold">{dog.name}</h3>
        <p>
          {dog.breed} - {dog.age} years old
        </p>
        <button
          onClick={toggleFavorite}
          className={`mt-2 px-4 py-2 ${isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-black"}`}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default DogListItem;
