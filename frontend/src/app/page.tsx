import {SearchMovies} from "@/components/SearchMovies";

export default async function Home() {
  return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Top 10 Movies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/*<MovieInitializer initialMovies={topMovies} />*/}
            <SearchMovies/>
        </div>
      </div>
  );
}
