const VideoTitle = ({ title, description }) => {
    return (
        <div className="w-full aspect-video pt-[15%] px-24 absolute text-white bg-gradient-to-r from-black via-transparent to-transparent">
            <h1 className="text-6xl font-semibold">{title}</h1>
            <p className="py-6 text-lg w-1/2">{description}</p>
            <div className="flex gap-2">
                <button className="bg-white text-black px-6 py-2 hover:opacity-60 duration-200 cursor-pointer rounded-md font-semibold">▶ Play</button>
                <button className="bg-gray-500 text-white px-6 py-2 hover:opacity-60 duration-200 cursor-pointer rounded-md font-semibold">More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle;