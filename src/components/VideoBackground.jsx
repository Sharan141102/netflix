import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer"

const VideoBackground = ({ movieId }) => {
    const trailerVideo = useSelector(state => state.movies?.trailerVideo);

    useMovieTrailer(movieId);

    return (
        <div className="w-full aspect-[4/3] sm:aspect-video overflow-hidden relative bg-black">
            <iframe
                className="w-full h-full scale-[1.35] md:scale-[1.3] pointer-events-none"
                src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?&autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=" + trailerVideo?.key}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
            </iframe>
        </div>
    )
}

export default VideoBackground