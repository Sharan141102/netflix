import { useSelector, useDispatch } from "react-redux"
import languageConstants from "../utils/languageConstants"
import { useRef } from "react"
import { geminiModel } from "../utils/gemini"
import { API_OPTIONS } from "../utils/constants"
import { addGptMovieResult } from "../utils/gptSlice"

const GptSearchBar = () => {

    const langKey = useSelector(state => state.config.lang)
    const searchText = useRef(null)
    const dispatch = useDispatch()

    // Fetch movies from TMDB for a single movie name
    const searchMoviesFromTMDB = async (movie) => {
        const data = await fetch(
            "https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1",
            API_OPTIONS
        );
        const json = await data.json();
        return json.results;
    }

    const handleSearchClick = async () => {
        // Step 1: Ask Gemini for movie recommendations
        const gptQuery =
            "Act as a movie Recommendation System and suggest some movies for the following query: " +
            searchText.current.value +
            " Return a comma separated list of movies, only give me the best 5 movies like the example result given ahead. Example Result: Vada Chennai, Thupakki, Ayan, Mankatha";

        try {
            const result = await geminiModel.generateContent(gptQuery);
            const geminiResults = result.response.text();
            console.log(geminiResults);

            // Step 2: Parse comma-separated movie names into an array
            const gptMovies = geminiResults.split(",").map(m => m.trim());

            // Step 3: Search each movie on TMDB
            const tmdbPromises = gptMovies?.map(movie => searchMoviesFromTMDB(movie));
            const tmdbResults = await Promise.all(tmdbPromises);

            // Step 4: Store results in Redux
            dispatch(addGptMovieResult({
                gptMovies: gptMovies,
                gptMovieResults: tmdbResults,
            }));

        } catch (error) {
            console.error("Search Error:", error);
            alert("Something went wrong: " + error.message);
        }
    }

    return (
        <div className="pt-36 sm:pt-28 md:pt-[10%] flex justify-center px-3 sm:px-6">
            <form className="w-full sm:w-11/12 md:w-8/12 lg:w-6/12 bg-black/90 grid grid-cols-12 rounded-xl border border-zinc-800 shadow-2xl p-1.5 md:p-2 backdrop-blur-sm" onSubmit={(e) => e.preventDefault()}>
                <input
                    ref={searchText}
                    type="text"
                    className="p-3 md:p-4 m-1 md:m-2 col-span-8 md:col-span-9 bg-zinc-800/90 text-white rounded-lg text-xs sm:text-sm md:text-base border border-zinc-700 focus:outline-none focus:border-white"
                    placeholder={languageConstants[langKey].gptSearchPlaceholder}
                />
                <button
                    onClick={handleSearchClick}
                    className="col-span-4 md:col-span-3 m-1 md:m-2 py-2 px-2 md:px-4 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs sm:text-sm md:text-base font-semibold cursor-pointer transition duration-200 shadow-md"
                >
                    {languageConstants[langKey].search}
                </button>
            </form>
        </div>
    )
}

export default GptSearchBar;