import { FC, useState } from 'react';
import SearchForm from './SearchForm';
import { useGetBreedsQuery, useSearchDogsQuery } from 'store/services/dogs';
import { useAppSelector } from 'store/hooks/store';


const SearchPage: FC = () => {
  const [isSearchFormVisible, setSearchFormVisible] = useState(false);
  const { query } = useAppSelector((state) => state.search);

  // Fetch dog breeds on mount
  useGetBreedsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Fetch initial query on mount
 useSearchDogsQuery(query, {
    refetchOnMountOrArgChange: true,
 });


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
