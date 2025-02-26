
// Функция для запроса топ-10 фильмов с бэкенда
import {Movie} from "@/types/types";
import {MovieCard} from "@/app/movies/MoviesCard";

async function fetchTopMovies(): Promise<Movie[]> {
  const res = await fetch("http://backend:3000/movies/top-rated", {
    cache: "no-store", // Отключаем кэш для актуальности
  });
  if (!res.ok) throw new Error("Failed to fetch top movies");
  return res.json();
}

export default async function Home() {
  const topMovies = await fetchTopMovies();

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Top 10 Movies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
  );
}
