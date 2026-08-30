import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_IMAGE } from "../utils/constants";

const GptSearchPage = () => {
    return (
        <div className="relative min-h-screen bg-black">
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
                <img className="w-full h-full object-cover" src={BG_IMAGE} alt="Background" />
                <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative z-10">
                <GptSearchBar />
                <GptMovieSuggestions />
            </div>
        </div>
    )
}

export default GptSearchPage;