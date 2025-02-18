import { FC, useState, useCallback } from "react";
import SearchForm from "./SubmitForm/SearchForm";
import { useGetBreedsQuery, useMatchDogsMutation } from "store/services/dogs";
import DogList from "./DogList/DogList";
import { useLogoutMutation } from "store/services/auth";
import Button from "@mui/material/Button";
import "./SearchPage.css";
import { getFavoriteDogIds, getFavoriteDog } from "utils/favorites";

const SearchPage: FC = () => {
  const [isSearchFormVisible, setSearchFormVisible] = useState(false);
  const [logout] = useLogoutMutation();
  const [matchDogs, { data: matchedDog }] = useMatchDogsMutation();

  // Fetch dog breeds on mount
  useGetBreedsQuery(undefined);

  const handleMatch = useCallback(() => {
    const favoriteDogIds = getFavoriteDogIds();

    if (favoriteDogIds.length === 0) {
      alert("Please add some dogs to your favorites first!");
      return;
    }

    matchDogs(favoriteDogIds);
  }, [matchDogs]);

  const handleLogout = () => {
    void logout();
  };

  // Matched dog
  console.log(getFavoriteDog(matchedDog?.match));

  return (
    <div className="search-container">
      <div className="search-button-container">
        <Button
          onClick={() => setSearchFormVisible(!isSearchFormVisible)}
          variant="contained"
          color="primary"
        >
          {isSearchFormVisible ? "Hide Search" : "Show Search"}
        </Button>
        <Button onClick={handleMatch} variant="contained" color="primary">
          Match from Favorites
        </Button>
        <Button
          onClick={handleLogout}
          id="logout"
          variant="contained"
          color="warning"
        >
          Logout
        </Button>
      </div>
      {isSearchFormVisible && <SearchForm />}
      <DogList />
    </div>
  );
};

export default SearchPage;
