import { FC, useState } from "react";
import SearchForm from "./SearchForm";
import { useGetBreedsQuery } from "store/services/dogs";
import DogList from "./DogList/DogList";

const SearchPage: FC = () => {
  const [isSearchFormVisible, setSearchFormVisible] = useState(false);

  // Fetch dog breeds on mount
  useGetBreedsQuery(undefined);

  return (
    <div>
      <button onClick={() => setSearchFormVisible(!isSearchFormVisible)}>
        {isSearchFormVisible ? "Hide Search" : "Show Search"}
      </button>
      {isSearchFormVisible && <SearchForm />}
      <DogList />
    </div>
  );
};

export default SearchPage;
