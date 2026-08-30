import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSuggestions = () => {
    const { gptMovies, gptMovieResults } = useSelector(state => state.gpt);

    if (!gptMovies) return null;

    return (
        <div className='p-2 sm:p-4 m-2 sm:m-4 md:m-6 bg-black/90 text-white rounded-xl shadow-2xl backdrop-blur-sm'>
            {gptMovies.map((movie, index) => (
                <MovieList key={index} title={movie} movies={gptMovieResults[index]} />
            ))}
        </div>
    )
}

export default GptMovieSuggestions