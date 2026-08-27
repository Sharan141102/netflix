import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { addUser, removeUser } from "../utils/userSlice"
import { NETFLIX_LOGO, USER_AVATAR } from "../utils/constants"

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((store) => store.user)

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

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <>
            <div className="absolute w-screen px-8 py-4 bg-gradient-to-b from-black to-transparent z-10 flex justify-between">
                <img className="w-44 mx-12 my-4" src={NETFLIX_LOGO} alt="Netflix Logo" />
                {user && <div className="flex">
                    <img className="w-14 h-14 mx-4 my-6 rounded-lg" src={user?.photoURL || USER_AVATAR} alt="usericon" />
                    <button onClick={handleSignOut} className="bg-red-700 text-white px-4 py-2 my-4 mx-4 rounded-lg cursor-pointer">Sign out</button>
                </div>}
            </div></>
    )
}

export default Header