import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_IMAGE } from "../utils/constants";

const GptSearchPage = () => {
    return (
        <div className="min-h-screen bg-black">
            <div className="absolute top-0 left-0 w-full">
                <img className="w-full object-cover" src={BG_IMAGE} alt="Background" />
            </div>
            <div className="relative z-10">
                <GptSearchBar />
                <GptMovieSuggestions />
            </div>
        </div>
    )
}

export default GptSearchPage;