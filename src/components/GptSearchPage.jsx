import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_IMAGE } from "../utils/constants";

const GptSearchPage = () => {
    return (
        <div>
            <div className="absolute w-full -z-10"><img src={BG_IMAGE} alt="Background" /></div>
            <GptSearchBar />
            <GptMovieSuggestions />
        </div>
    )
}

export default GptSearchPage;