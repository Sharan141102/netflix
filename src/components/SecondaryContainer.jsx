import React from 'react'
import MovieList from './MovieList'
import MovieCard from './MovieCard'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
    const movies = useSelector(state => state.movies)
    return (
        <div className="bg-black">
            <div className="-mt-48 relative z-20 pb-10">
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