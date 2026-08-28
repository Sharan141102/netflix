import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showGptSearch: false
}

const gptSlice = createSlice({
    name: "gpt",
    initialState,
    reducers: {
        toggleGptSearch: (state) => {
            state.showGptSearch = !state.showGptSearch;
        }
    }
})

export const { toggleGptSearch } = gptSlice.actions;

export default gptSlice.reducer;