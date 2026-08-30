import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedMovie } from "../utils/moviesSlice";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constants";

const MovieModal = () => {
    const dispatch = useDispatch();
    const selectedMovie = useSelector((state) => state.movies.selectedMovie);
    const [trailerKey, setTrailerKey] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const closeModal = () => {
        dispatch(clearSelectedMovie());
    };

    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };

        if (selectedMovie) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedMovie]);

    // Fetch movie trailer whenever selectedMovie changes
    useEffect(() => {
        if (!selectedMovie?.id) {
            setTrailerKey(null);
            return;
        }

        let isMounted = true;
        setIsLoading(true);
        setTrailerKey(null);

        const fetchTrailer = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos?language=en-US`,
                    API_OPTIONS
                );
                const data = await response.json();
                if (!isMounted) return;

                if (data?.results && data.results.length > 0) {
                    const trailer = data.results.find(
                        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
                    ) || data.results.find(
                        (vid) => (vid.type === "Teaser" || vid.type === "Clip") && vid.site === "YouTube"
                    ) || data.results[0];

                    if (trailer?.key) {
                        setTrailerKey(trailer.key);
                    }
                }
            } catch (error) {
                console.error("Error fetching trailer:", error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchTrailer();

        return () => {
            isMounted = false;
        };
    }, [selectedMovie]);

    if (!selectedMovie) return null;

    const movieTitle = selectedMovie.title || selectedMovie.original_title || selectedMovie.name;
    const releaseYear = (selectedMovie.release_date || selectedMovie.first_air_date)?.split("-")[0];
    const voteAverage = selectedMovie.vote_average ? selectedMovie.vote_average.toFixed(1) : null;
    const backdropImg = selectedMovie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`
        : (selectedMovie.poster_path ? IMG_CDN_URL + selectedMovie.poster_path : null);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-300"
            onClick={closeModal}
        >
            <div
                className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-700/50 text-white transform transition-all duration-300 scale-100"
                onClick={(e) => e.stopPropagation()}
                style={{ scrollbarWidth: 'thin' }}
            >
                {/* Close Button */}
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 z-40 bg-zinc-900/80 hover:bg-zinc-700 text-white rounded-full p-2.5 backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-110 shadow-lg cursor-pointer"
                    aria-label="Close"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Video / Backdrop Header Section */}
                <div className="relative w-full aspect-video bg-black rounded-t-2xl overflow-hidden shadow-inner">
                    {trailerKey ? (
                        <iframe
                            className="w-full h-full scale-[1.35] pointer-events-none"
                            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&playlist=${trailerKey}&controls=0&modestbranding=1&rel=0&iv_load_policy=3`}
                            title={movieTitle}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                    ) : backdropImg ? (
                        <img
                            src={backdropImg}
                            alt={movieTitle}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-400">
                            <span>No video preview available</span>
                        </div>
                    )}

                    {/* Gradient Overlay for seamless blending */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent pointer-events-none" />

                    {/* Overlaid Title inside Header */}
                    <div className="absolute bottom-6 left-6 right-6 z-20">
                        <div className="space-y-2 max-w-xl">
                            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight drop-shadow-md text-white">
                                {movieTitle}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Popover Details Content */}
                <div className="p-6 sm:p-8 space-y-6">
                    {/* Metadata Badges */}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-300 font-medium">
                        {voteAverage && (
                            <span className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-md font-semibold">
                                ★ {voteAverage}
                            </span>
                        )}
                        {releaseYear && (
                            <span className="text-zinc-400">
                                {releaseYear}
                            </span>
                        )}
                        {selectedMovie.original_language && (
                            <span className="uppercase text-xs font-semibold px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-300">
                                {selectedMovie.original_language}
                            </span>
                        )}
                        {selectedMovie.adult !== undefined && (
                            <span className="text-xs px-2 py-0.5 border border-zinc-700 rounded text-zinc-400">
                                {selectedMovie.adult ? "18+" : "U/A 13+"}
                            </span>
                        )}
                    </div>

                    {/* Description / Overview */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-zinc-200">Overview</h3>
                        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                            {selectedMovie.overview || "No description available for this movie."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;
