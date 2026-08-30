import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
    if (!movies) return null;
    return (
        <div className="px-8 py-4">
            <h1 className="text-white text-xl font-semibold mb-3">{title}</h1>
            <div className="flex gap-3 overflow-x-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} posterPath={movie.poster_path} />
                ))}
            </div>
        </div>
    )
}

export default MovieList