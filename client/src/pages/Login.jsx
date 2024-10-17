import { useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import MessageReactToast from "../utils/MessageReactToast";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,  
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const Login = () => {
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    dispatch(signInStart());

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      } else {
        const data = await response.json();
        toast.success(
          <MessageReactToast
            message={"Logged In Successfully"}
            closeToast={() => toast.dismiss()}
          />
        );
        console.log(data);
        dispatch(signInSuccess(data));
        navigate("/profile");
      }
    } catch (error) {
      toast.error(
        <MessageReactToast
          message={error.message}
          closeToast={() => toast.dismiss()}
        />
      );
      dispatch(signInFailure(error.message));
    }
    console.log(username, password);
  };

  return (
    <div className="bg-white flex items-center justify-center mt-16">
      <div className="w-full max-w-lg p-6 sm:p-12 bg-gray-100 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">
          Login
        </h1>

        <form className="flex flex-col gap-4 mb-6" onSubmit={handleSubmit}>
          <input
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            type="text"
            placeholder="Username"
            ref={usernameRef}
            required
          />
          <input
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-4 rounded-lg hover:bg-teal-500 hover:animate-wobble transition duration-300"
          >
            {loading ? "Loading...." : "Login"}
          </button>
        </form>

        {/* Already have an account section */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Dont have an account?</p>
          <Link to="/signup">
            <button className="bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-300">
              Signup
            </button>
          </Link>
        </div>
        <OAuth/>
      </div>
    </div>
  );
};

export default Login;
