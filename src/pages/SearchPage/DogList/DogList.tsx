import { FC } from "react";
import DogListItem from "./DogListItem";
import { useSearchDogs } from "hooks/useSearchDogs";
import "./DogList.css";
import Button from "@mui/material/Button";

const DogList: FC = () => {
  const {
    dogs,
    fetchNextPage,
    fetchPrevPage,
    nextQuery,
    prevQuery,
    isLoading,
  } = useSearchDogs();

  if (isLoading) {
    return null;
  }

  if (!dogs || dogs.length === 0) {
    return <p className="text-center mt-4">No dogs found.</p>;
  }

  return (
    <div>
      <div>
        {dogs.map((dog) => (
          <DogListItem key={dog.id} dog={dog} />
        ))}
      </div>
      <div className="pagination-button-container">
        <Button
          onClick={fetchPrevPage}
          variant="contained"
          color="primary"
          disabled={isLoading || !prevQuery}
        >
          Previous
        </Button>
        <Button
          onClick={fetchNextPage}
          variant="contained"
          color="primary"
          disabled={isLoading || !nextQuery}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DogList;
