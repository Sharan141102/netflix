import { useDispatch } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";
import { setSelectedMovie } from "../utils/moviesSlice";

const MovieCard = ({ movie, posterPath }) => {
    const dispatch = useDispatch();
    const poster = posterPath || movie?.poster_path;

    if (!poster) return null;

    const handleClick = () => {
        if (movie) {
            dispatch(setSelectedMovie(movie));
        }
    };

    return (
        <div 
            onClick={handleClick}
            className="w-36 md:w-44 flex-shrink-0 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-black/50 transition-all duration-300 rounded-lg overflow-hidden group relative"
        >
            <img 
                className="w-full h-full object-cover rounded-lg group-hover:brightness-110 transition duration-300" 
                src={IMG_CDN_URL + poster} 
                alt={movie?.title || "Movie Card"} 
                loading="lazy"
            />
        </div>
    )
}

export default MovieCard;