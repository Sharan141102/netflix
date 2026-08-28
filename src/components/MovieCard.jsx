import { IMG_CDN_URL } from "../utils/constants"

const MovieCard = ({ posterPath }) => {
    if (!posterPath) return;
    return (
        <div className="w-36 flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200 rounded-md overflow-hidden">
            <img className="w-full h-full object-cover" src={IMG_CDN_URL + posterPath} alt="Movie Card" />
        </div>
    )
}

export default MovieCard