import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
    if (!movies) return null;
    return (
        <div className="px-4 md:px-8 py-2 md:py-4">
            <h1 className="text-white text-base sm:text-lg md:text-xl font-semibold mb-2 md:mb-3">{title}</h1>
            <div className="flex gap-2.5 md:gap-3 overflow-x-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} posterPath={movie.poster_path} />
                ))}
            </div>
        </div>
    )
}

export default MovieList