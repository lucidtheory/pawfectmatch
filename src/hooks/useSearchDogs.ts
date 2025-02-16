import { useGetDogsMutation, useSearchDogsQuery } from "store/services/dogs";
import { useAppSelector } from "store/hooks/store";
import { useEffect, useState, useCallback } from "react";

const updateQueryWithNewFrom = (
  prevPath: string | null,
  newPath: string | null,
) => {
  const prevParams = new URLSearchParams(prevPath?.split("?")[1] ?? "");
  const newParams = new URLSearchParams(newPath?.split("?")[1] ?? "");

  if (prevParams.has("from")) {
    prevParams.delete("from");
  }

  if (newParams) {
    prevParams.append("from", newParams.get("from") ?? "");
  }

  return prevParams.toString();
};

export const useSearchDogs = () => {
  const { query } = useAppSelector((state) => state.search);
  const [activeQuery, setActiveQuery] = useState<string | null>(query);
  const [nextQuery, setNextQuery] = useState<string | null>(null);
  const [prevQuery, setPrevQuery] = useState<string | null>(null);
  const { data: searchResults } = useSearchDogsQuery(activeQuery ?? "", {
    refetchOnMountOrArgChange: true,
  });
  const [getDogs, { isLoading, isError, data: dogs }] = useGetDogsMutation();

  /**
   * Fetch dogs when search results are available
   * And when they change, also set the next and prev queries
   */
  useEffect(() => {
    if (searchResults) {
      getDogs(searchResults.resultIds);

      setNextQuery(searchResults.next);
      setPrevQuery(searchResults.prev);
    }
  }, [searchResults, getDogs]);

  useEffect(() => {
    setActiveQuery(query);
  }, [query]);

  const fetchNextPage = useCallback(() => {
    setActiveQuery((prevActive) =>
      updateQueryWithNewFrom(prevActive, nextQuery),
    );
  }, [nextQuery, getDogs]);

  const fetchPrevPage = useCallback(() => {
    setActiveQuery((prevActive) =>
      updateQueryWithNewFrom(prevActive, prevQuery),
    );
  }, [prevQuery, getDogs]);

  return {
    dogs,
    fetchNextPage,
    fetchPrevPage,
    nextQuery,
    prevQuery,
    isLoading,
    isError,
  };
};
