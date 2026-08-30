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
        <div>
            <div className="pt-[10%] flex justify-center">
                <form className="w-1/2 bg-black grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
                    <input
                        ref={searchText}
                        type="text"
                        className="p-4 m-4 col-span-9"
                        placeholder={languageConstants[langKey].gptSearchPlaceholder}
                    />
                    <button
                        onClick={handleSearchClick}
                        className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
                    >
                        {languageConstants[langKey].search}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default GptSearchBar;