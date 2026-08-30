import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    trailerVideo: null,
    selectedMovie: null,
}

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload
        },
        addTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload
        },
        addUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload
        },
        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload;
        },
        clearSelectedMovie: (state) => {
            state.selectedMovie = null;
        }
    }
})

export const { 
    addNowPlayingMovies, 
    addPopularMovies, 
    addTopRatedMovies, 
    addUpcomingMovies, 
    addTrailerVideo,
    setSelectedMovie,
    clearSelectedMovie
} = moviesSlice.actions

export default moviesSlice.reducer