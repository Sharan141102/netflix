import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { addUser, removeUser } from "../utils/userSlice"
import { NETFLIX_LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants"
import { toggleGptSearch } from "../utils/gptSlice"
import { changeLanguage } from "../utils/configSlice"

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const showGptSearch = useSelector((state) => state.gpt.showGptSearch)

    const handleGptSearch = () => {
        dispatch(toggleGptSearch())
    }

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value))
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                const { uid, email, displayName, photoURL } = user
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
                navigate("/browse")
            } else {
                // User is signed out
                dispatch(removeUser())
                navigate("/")
            }
        });
        return () => {
            // unsubscribe when component unmounts
            unsubscribe()
        }
    }, [])

    const handleLogoClick = () => {
        if (showGptSearch) {
            dispatch(toggleGptSearch())
        }
    }

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <header className="fixed top-0 left-0 right-0 w-full h-16 md:h-20 px-3 sm:px-6 md:px-10 z-40 flex flex-row justify-between items-center bg-black shadow-lg border-b border-zinc-900">
            <img
                onClick={handleLogoClick}
                className="w-20 sm:w-28 md:w-40 cursor-pointer transition-transform duration-200 hover:scale-105"
                src={NETFLIX_LOGO}
                alt="Netflix Logo"
            />
            {user && (
                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                    {showGptSearch && (
                        <select
                            onChange={handleLanguageChange}
                            className="bg-zinc-900 text-white border border-zinc-700 px-2 py-1 md:px-3 md:py-2 text-[10px] sm:text-xs md:text-sm rounded-md cursor-pointer focus:outline-none"
                        >
                            {SUPPORTED_LANGUAGES.map((lang) => (
                                <option key={lang.value} value={lang.value}>{lang.label}</option>
                            ))}
                        </select>
                    )}
                    <button
                        onClick={handleGptSearch}
                        className="bg-green-600 hover:bg-green-700 text-white text-[10px] sm:text-xs md:text-sm font-medium px-2.5 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 rounded-md cursor-pointer transition duration-200 shadow-md whitespace-nowrap"
                    >
                        {showGptSearch ? "Home" : "Search Movies"}
                    </button>
                    <img
                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-md object-cover border border-zinc-700"
                        src={user?.photoURL || USER_AVATAR}
                        alt="usericon"
                    />
                    <button
                        onClick={handleSignOut}
                        className="bg-red-700 hover:bg-red-800 text-white text-[10px] sm:text-xs md:text-sm font-medium px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-md cursor-pointer transition duration-200 shadow-md whitespace-nowrap"
                    >
                        Sign out
                    </button>
                </div>
            )}
        </header>
    )
}

export default Header