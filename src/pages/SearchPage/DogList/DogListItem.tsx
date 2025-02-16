import { FC } from "react";
import { Dog } from "store/services/types/dogs";

interface DogListItemProps {
  dog: Dog;
}

const DogListItem: FC<DogListItemProps> = ({ dog }) => {
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
      </div>
    </div>
  );
};

export default DogListItem;
