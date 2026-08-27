import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nowPlayingMovies: null,
    trailerVideo: null
}

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload
        }
    }
})

export const { addNowPlayingMovies, addTrailerVideo } = moviesSlice.actions

export default moviesSlice.reducer