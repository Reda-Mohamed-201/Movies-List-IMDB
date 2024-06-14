import { useEffect, useState } from "react";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const Ky = "d9d69e1";
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setError("");
          setIsLoading(true);
          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${Ky}&s=${query}`,
            { signal: controller.signal }
          );
          if (!response.ok) throw new Error("something went wrong ....");
          const data = await response.json();
          if (data.Response === "False")
            throw new Error("Not isWatched any movie");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      //   handleCloseMovie();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return [movies, isLoading, error];
}
