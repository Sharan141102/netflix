import { useRef, useState } from "react"
import Header from "./Header"
import checkValidateData from "../utils/validate"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const name = useRef(null)
    const email = useRef(null)
    const password = useRef(null)

    const toggleSignIn = () => {
        setErrorMessage(null)
        setIsSignInForm(!isSignInForm)
    }

    const handleButtonClick = () => {
        // Validate the form data
        let message = null;
        if (!isSignInForm) {
            message = checkValidateData(name.current.value, email.current.value, password.current.value)
        } else {
            message = checkValidateData(null, email.current.value, password.current.value)
        }
        setErrorMessage(message)

        if (message) return;

        // Login / Sign Up Logic
        if (!isSignInForm) {
            //Sign Up Logic
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    const user = userCredential.user;
                    // update Profile
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: "https://www.example.com/jane-q-user/profile.jpg"
                    }).then(() => {
                        // Profile updated!
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
                        navigate("/browse")
                    }).catch((error) => {
                        // An error occurred
                        setErrorMessage(error.code + " - " + error.message);
                    });
                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - " + errorMessage);
                });
        }
        else {
            //Login Logic
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/browse")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - " + errorMessage);
                });
        }
    }

    return (
        <div>
            <Header />
            <div className="absolute"><img src="https://assets.nflxext.com/ffe/siteui/vlv3/6ef286cc-b89b-4da3-bab7-62971d87dbd0/web/IN-en-20260817-TRIFECTA-perspective_dce6e6bc-2bd3-45f2-9086-211bf8b6e8c8_large.jpg" alt="Background" /></div>
            <form onSubmit={(e) => e.preventDefault()} className="absolute bg-black w-3/12 p-8 my-36 mx-auto left-0 right-0 bg-opacity-70">
                <h1 className="text-white font-bold text-3xl py-4">{isSignInForm ? "Login" : "Sign Up"}</h1>
                {!isSignInForm &&
                    <input
                        className="p-4 my-2 w-full bg-gray-800 text-white"
                        ref={name}
                        type="text" placeholder="Full Name" />
                }
                <input
                    className="p-4 my-2 w-full bg-gray-800 text-white"
                    ref={email}
                    type="text" placeholder="Email or phone number" />
                <input
                    className="p-4 my-2 w-full bg-gray-800 text-white"
                    ref={password}
                    type="password" placeholder="Password" />
                <p className="text-red-600">{errorMessage}</p>
                <button
                    onClick={handleButtonClick}
                    className="p-4 my-4 bg-red-700 text-white w-full">
                    {isSignInForm ? "Login" : "Sign Up"}
                </button>
                <p
                    className="text-white"
                    onClick={toggleSignIn}>
                    {isSignInForm ? "New to Netflix? " : "Already have an account? "}
                    <span className="text-red-600 cursor-pointer">
                        {isSignInForm ? "Sign Up now" : "Login Now"}
                    </span>
                </p>
            </form>
        </div>
    )
}

export default Login;