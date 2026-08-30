import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
    const movies = useSelector(state => state.movies)
    return (
        <div className="bg-black">
            <div className="mt-0 sm:-mt-10 md:-mt-24 lg:-mt-36 relative z-20 pb-10">
                <MovieList
                    title={"Now Playing"}
                    movies={movies?.nowPlayingMovies}
                />
                <MovieList
                    title={"Popular Movies"}
                    movies={movies?.popularMovies}
                />
                <MovieList
                    title={"Top Rated Movies"}
                    movies={movies?.topRatedMovies}
                />
                <MovieList
                    title={"Upcoming Movies"}
                    movies={movies?.upcomingMovies}
                />
            </div>
        </div>
    )
}

export default SecondaryContainer