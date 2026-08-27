import Header from "./Header"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
    // Custom Hook for fetching now playing movies
    useNowPlayingMovies();

    return (
        <div>
            <Header />
            <MainContainer />
            {/* <SecondaryContainer /> */}
        </div>
    )
}

export default Browse