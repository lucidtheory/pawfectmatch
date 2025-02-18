import { FC, useState } from "react";
import SearchForm from "./SearchForm";
import { useGetBreedsQuery } from "store/services/dogs";
import DogList from "./DogList/DogList";
import { useLogoutMutation } from "store/services/auth";

const SearchPage: FC = () => {
  const [isSearchFormVisible, setSearchFormVisible] = useState(false);
  const [logout] = useLogoutMutation();

  // Fetch dog breeds on mount
  useGetBreedsQuery(undefined);

  const handleLogout = () => {
    void logout();
  };

  return (
    <div>
      <nav>
        <button id="logout" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <button onClick={() => setSearchFormVisible(!isSearchFormVisible)}>
        {isSearchFormVisible ? "Hide Search" : "Show Search"}
      </button>
      {isSearchFormVisible && <SearchForm />}
      <DogList />
    </div>
  );
};

export default SearchPage;
