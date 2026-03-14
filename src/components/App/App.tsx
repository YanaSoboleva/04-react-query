import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setIsError(false);
      setIsLoading(true);

      const data = await fetchMovies(query);
      if (data.length === 0) {
        toast.dismiss();
        toast("No movies found for your request.", {
          icon: '🔍',
          position: "top-center",
        });
        return;
      }

      setMovies(data);
    } catch {
      setIsError(true);
      toast.error("Oops! Something went wrong.", {
      position: "top-center", 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />

      <main style={{ padding: '20px' }}>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {movies.length > 0 && !isLoading && (
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
        )}
      </main>

      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default App;
