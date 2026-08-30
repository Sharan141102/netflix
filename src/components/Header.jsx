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
        <>
            <div className="absolute w-screen px-8 py-4 bg-gradient-to-b from-black to-transparent z-30 flex justify-between">
                <img 
                    onClick={handleLogoClick}
                    className="w-44 mx-12 my-4 cursor-pointer" 
                    src={NETFLIX_LOGO} 
                    alt="Netflix Logo" 
                />
                {user && <div className="flex items-center p-2">
                    {showGptSearch && (
                        <select onChange={handleLanguageChange} className="bg-black text-white px-4 h-10 my-4 mx-4 rounded-lg cursor-pointer">
                            {SUPPORTED_LANGUAGES.map((lang) => (
                                <option key={lang.value} value={lang.value}>{lang.label}</option>
                            ))}
                        </select>
                    )}
                    <button onClick={handleGptSearch} className="bg-green-500 text-white px-8 h-10 my-4 mx-4 rounded-lg cursor-pointer">{showGptSearch ? "Home" : "Search Movies"}</button>
                    <img className="w-10 h-10 mx-4 my-4 rounded-lg" src={user?.photoURL || USER_AVATAR} alt="usericon" />
                    <button onClick={handleSignOut} className="bg-red-700 text-white h-10 px-4 py-2 my-4 mx-4 rounded-lg cursor-pointer">Sign out</button>
                </div>
                }
            </div></>
    )
}

export default Header