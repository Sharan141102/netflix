import { useSelector } from "react-redux"
import languageConstants from "../utils/languageConstants"

const GptSearchBar = () => {

    const langKey = useSelector(state => state.config.lang)

    return (
        <div>
            <div className="pt-[10%] flex justify-center">
                <form className="w-1/2 bg-black grid grid-cols-12">
                    <input type="text" className="p-4 m-4 col-span-9" placeholder={languageConstants[langKey].gptSearchPlaceholder} />
                    <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg">{languageConstants[langKey].search}</button>
                </form>
            </div>
        </div >
    )
}

export default GptSearchBar