import { FC } from "react";
import DogListItem from "./DogListItem";
import { useSearchDogs } from "hooks/useSearchDogs";

const DogList: FC = () => {
  const {
    dogs,
    fetchNextPage,
    fetchPrevPage,
    nextQuery,
    prevQuery,
    isLoading,
  } = useSearchDogs();

  if (!dogs || dogs.length === 0)
    return <p className="text-center mt-4">No dogs found.</p>;

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
      </div>
    </div>
  );
};

export default DogList;
