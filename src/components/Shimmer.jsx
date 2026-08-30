const Shimmer = () => {
    return (
        <div>
            <div className="relative z-20 pb-10">
                <div className="flex flex-col gap-4">
                    <div className="h-12 w-48 bg-gray-700 animate-pulse"></div>
                    <div className="flex gap-4">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div key={index} className="w-48 h-28 bg-gray-700 animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shimmer;