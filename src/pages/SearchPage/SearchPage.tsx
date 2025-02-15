import { FC, useState } from 'react';
import SearchForm from './SearchForm';
import { useGetBreedsQuery, useSearchDogsQuery } from 'store/services/dogs';


const SearchPage: FC = () => {
  const [isSearchFormVisible, setSearchFormVisible] = useState(false);
  const { data: breeds, isLoading: isBreedsLoading, isError: isBreedsError } = useGetBreedsQuery();
//  const { data: dogs, isLoading: isDogsLoading, isError: isDogsError } = useSearchDogsQuery({});
  return (
    <div>
      <button onClick={() => setSearchFormVisible(!isSearchFormVisible)}>
        {isSearchFormVisible ? 'Hide Search' : 'Show Search'}
      </button>

      {isSearchFormVisible && <SearchForm />}
    </div>
  );
};

export default SearchPage;
