import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showGptSearch: false,
    gptMovies: null,
    gptMovieResults: null,
}

const gptSlice = createSlice({
    name: "gpt",
    initialState,
    reducers: {
        toggleGptSearch: (state) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovieResult: (state, action) => {
            state.gptMovies = action.payload.gptMovies;
            state.gptMovieResults = action.payload.gptMovieResults;
        }
    }
})

export const { toggleGptSearch, addGptMovieResult } = gptSlice.actions;

export default gptSlice.reducer;