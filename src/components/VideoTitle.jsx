import { useDispatch } from "react-redux";
import { setSelectedMovie } from "../utils/moviesSlice";

const VideoTitle = ({ movie, title, description }) => {
    const dispatch = useDispatch();

    const handleMoreInfo = () => {
        if (movie) {
            dispatch(setSelectedMovie(movie));
        }
    };

    return (
        <div className="w-full aspect-[4/3] sm:aspect-video pt-[20%] sm:pt-[16%] md:pt-[12%] lg:pt-[14%] px-3.5 sm:px-12 md:px-24 absolute text-white bg-gradient-to-r from-black via-black/40 to-transparent z-10 flex flex-col justify-end pb-4 sm:pb-8 md:pb-0 md:justify-start">
            <h1 className="text-2xl py-6 sm:text-3xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg">{title}</h1>
            <p className="hidden sm:inline-block py-2 md:py-4 text-sm md:text-base lg:text-lg w-full sm:w-3/4 md:w-1/2 line-clamp-3 text-zinc-200 drop-shadow">{description}</p>
            <div className="flex gap-2 pt-1 sm:pt-2 md:pt-3">
                <button
                    onClick={handleMoreInfo}
                    className="bg-white text-black px-3.5 md:px-6 py-1.5 md:py-2 hover:opacity-80 duration-200 cursor-pointer rounded-md font-semibold text-xs sm:text-sm md:text-base shadow-md flex items-center gap-1.5"
                >
                    ▶ Play
                </button>
                <button
                    onClick={handleMoreInfo}
                    className="bg-zinc-600/80 hover:bg-zinc-700 text-white px-3.5 md:px-6 py-1.5 md:py-2 duration-200 cursor-pointer rounded-md font-semibold text-xs sm:text-sm md:text-base shadow-md backdrop-blur-sm"
                >
                    More Info
                </button>
            </div>
        </div>
    )
}

export default VideoTitle;