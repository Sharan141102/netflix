import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSuggestions = () => {
    const { gptMovies, gptMovieResults } = useSelector(state => state.gpt);

    if (!gptMovies) return null;

    return (
        <div className='p-4 m-4 bg-black text-white bg-opacity-90'>
            {gptMovies.map((movie, index) => (
                <MovieList key={index} title={movie} movies={gptMovieResults[index]} />
            ))}
        </div>
    )
}

export default GptMovieSuggestions