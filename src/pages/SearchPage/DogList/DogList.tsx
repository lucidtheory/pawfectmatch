import { FC, useCallback } from "react";
import DogListItem from "./DogListItem";
import { useSearchDogs } from "hooks/useSearchDogs";
import { useMatchDogsMutation } from "store/services/dogs";
import { getFavoriteDog, getFavoriteDogIds } from "utils/favorites";

const DogList: FC = () => {
  const {
    dogs,
    fetchNextPage,
    fetchPrevPage,
    nextQuery,
    prevQuery,
    isLoading,
  } = useSearchDogs();
  const [matchDogs, { data: matchedDog }] = useMatchDogsMutation();

  const handleMatch = useCallback(() => {
    const favoriteDogIds = getFavoriteDogIds();

    if (favoriteDogIds.length === 0) {
      alert("Please add some dogs to your favorites first!");
      return;
    }

    matchDogs(favoriteDogIds);
  }, [matchDogs]);

  if (!dogs || dogs.length === 0)
    return <p className="text-center mt-4">No dogs found.</p>;

  // Matched dog
  console.log(getFavoriteDog(matchedDog?.match));

  return (
    <div className="mt-4 border rounded-lg overflow-hidden">
      <div>
        {dogs.map((dog) => (
          <DogListItem key={dog.id} dog={dog} />
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="mt-4">
        <button onClick={fetchPrevPage} disabled={isLoading || !prevQuery}>
          Previous
        </button>
        <button onClick={fetchNextPage} disabled={isLoading || !nextQuery}>
          Next
        </button>
        <button onClick={handleMatch} disabled={isLoading}>
          Match from Favorites
        </button>
      </div>
    </div>
  );
};

export default DogList;
