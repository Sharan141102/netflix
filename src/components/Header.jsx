import { signOut } from "firebase/auth"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Header = () => {
    const navigate = useNavigate()
    const user = useSelector((store) => store.user)
    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/")
        }).catch((error) => {
            // An error happened.
            navigate("/error")
        });
    }

    return (
        <>
            <div className="absolute w-screen px-8 py-4 bg-gradient-to-b from-black to-transparent z-10 flex justify-between">
                <img className="w-44 mx-12 my-4" src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAfwxusEeCteu-L_QQ56_G2cohyI1E4BIh2uyr5t9gDhH0CKWHw3NVhndjuF7yQ26z3cYq_lnzY5pP6OarHyiibuiy2jIIa5sIhSvgal1S6u9YDVAyVoX6osPniEKN-dYy77H_pLfOCD7.svg" alt="Netflix Logo" />
                {user && <div className="flex">
                    <img className="w-14 h-14 mx-4 my-6 rounded-lg" src={user?.photoURL} alt="Netflix Logo" />
                    <button onClick={handleSignOut} className="bg-red-700 text-white px-4 py-2 my-4 mx-4 rounded-lg cursor-pointer">Sign out</button>
                </div>}
            </div></>
    )
}

export default Header