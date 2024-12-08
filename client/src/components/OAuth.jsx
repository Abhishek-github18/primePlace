import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import MessageReactToast from "../utils/MessageReactToast";
import { toast } from "react-toastify";

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const handleGoogleAuth = async () => {
        try{
            // Sign in using google oauth
            const provider = new GoogleAuthProvider();  
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            
            console.log(result);

            const user = result.user;

            console.log(user.displayName, user.email, user.providerData[0].photoURL);

            const response = await fetch(`${BASE_URL}/api/auth/google`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email: user.email,
                    name: user.displayName,
                    image: user.providerData[0].photoURL
                })
            });
            if(!response.ok){
                dispatch(signInFailure("Could not sign in using Google OAuth"));
                toast.error(<MessageReactToast message={"Could not sign in using Google OAuth"}/>);
                navigate("/login");
            }else{
                const data = await response.json();
                dispatch(signInSuccess(data));
                toast.success(<MessageReactToast message={"Logged In Successfully"}/>);
                navigate("/profile");
            }
        } catch (error) {
            dispatch(signInFailure("Could not sign in using Google OAuth"));
            toast.error(<MessageReactToast message={"Could not sign in using Google OAuth"}/>);
            navigate("/login");
            console.log("Could not sign in using Google OAuth", error);
        }
    };

    return (
        <div className="flex items-center justify-center mt-4">
            <button
                type="button"
                onClick={handleGoogleAuth}
                className="flex items-center bg-white text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-md transition-shadow duration-300 ease-in-out"
            >
                {/* Google Icon */}
                <svg
                    className="w-6 h-6 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    fill="none"
                >
                    <path
                        fill="#4285F4"
                        d="M24 9.5c3.54 0 5.97 1.53 7.34 2.81L36.72 9c-2.89-2.69-6.69-4.5-12.72-4.5C12.91 4.5 6 10.92 6 19.5S12.91 34.5 24 34.5c8.61 0 12.36-5.68 12.93-8.72H24v-7.28h21.43C46 21.19 46 23.09 46 25c0 9.31-6.37 16.01-22 16.01C10.92 41.01 2 32.09 2 20.51S10.92 0 24 0c5.92 0 10.67 2.32 14.5 5.91L36.72 9C34.49 7.18 29.95 4.5 24 4.5 15.28 4.5 8 11.72 8 20.5s7.28 16 16 16c7.43 0 10.97-5.1 11.43-9.25H24V20h21.43C45.2 29.16 37.36 37 24 37 10.92 37 2 28.09 2 16.51S10.92 0 24 0z"
                    />
                </svg>

                Continue with Google
            </button>
        </div>
    );
};

export default OAuth;
