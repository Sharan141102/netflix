import { useRef, useState } from "react"
import Header from "./Header"
import checkValidateData from "../utils/validate"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMAGE, USER_AVATAR } from "../utils/constants";

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

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
                        photoURL: USER_AVATAR
                    }).then(() => {
                        // Profile updated!
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
                    }).catch((error) => {
                        // An error occurred
                        setErrorMessage(error.code + " - " + error.message);
                    });
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
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - " + errorMessage);
                });
        }
    }

    return (
        <div className="relative min-h-screen overflow-x-hidden flex flex-col">
            <div className="fixed top-0 left-0 w-full h-full -z-10">
                <img className="w-full h-full object-cover" src={BG_IMAGE} alt="Background" />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>
            <Header />
            <div className="flex-1 flex justify-center items-center px-4 pt-24 pb-12 sm:pt-28 sm:pb-16">
                <form 
                    onSubmit={(e) => e.preventDefault()} 
                    className="relative z-10 bg-black/85 w-full sm:w-10/12 md:w-8/12 lg:w-4/12 max-w-md min-h-[520px] sm:min-h-[560px] p-7 sm:p-10 md:p-12 my-auto rounded-2xl border border-zinc-800 text-white shadow-2xl backdrop-blur-md flex flex-col justify-center"
                >
                    <h1 className="text-white font-bold text-2xl sm:text-3xl pb-6">
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </h1>
                    {!isSignInForm &&
                        <input
                            className="p-4 my-2.5 w-full bg-zinc-800/90 text-white rounded-lg border border-zinc-700 focus:outline-none focus:border-white text-sm sm:text-base"
                            ref={name}
                            type="text" 
                            placeholder="Full Name" 
                        />
                    }
                    <input
                        className="p-4 my-2.5 w-full bg-zinc-800/90 text-white rounded-lg border border-zinc-700 focus:outline-none focus:border-white text-sm sm:text-base"
                        ref={email}
                        type="text" 
                        placeholder="Email Address" 
                    />
                    <input
                        className="p-4 my-2.5 w-full bg-zinc-800/90 text-white rounded-lg border border-zinc-700 focus:outline-none focus:border-white text-sm sm:text-base"
                        ref={password}
                        type="password" 
                        placeholder="Password" 
                    />
                    {errorMessage && (
                        <p className="text-red-500 font-medium text-xs sm:text-sm py-1.5">{errorMessage}</p>
                    )}
                    <button
                        onClick={handleButtonClick}
                        className="p-4 my-4 bg-red-700 hover:bg-red-800 text-white font-semibold text-base sm:text-lg rounded-lg w-full transition duration-200 cursor-pointer shadow-lg"
                    >
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>
                    <p
                        className="text-zinc-400 text-xs sm:text-sm pt-4"
                    >
                        {isSignInForm ? "New to Netflix? " : "Already have an account? "}
                        <span 
                            onClick={toggleSignIn}
                            className="text-white font-medium hover:underline cursor-pointer ml-1"
                        >
                            {isSignInForm ? "Sign up now." : "Sign in now."}
                        </span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;