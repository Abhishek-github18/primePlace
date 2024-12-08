import { Link } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import {
  validateEmail,
  validateUsername,
  validatePassword,
} from "../utils/validation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import MessageReactToast from "../utils/MessageReactToast";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [showError, setShowError] = useState(null);
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const email = emailRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const validationError = validateInput({ email, username, password });
    if (validationError) {
      handleValidationError(validationError);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
        credentials: "include", // Ensure cookies are included in cross-origin requests

      });

      const data = await response.json();
      handleResponse(response.ok, data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const validateInput = ({ email, username, password }) => {
    if (!validateEmail(email)) {
      return "Please enter a valid email address";
    }
    if (!validateUsername(username)) {
      return "Please enter a valid username";
    }
    // Uncomment when ready for production
    // if (!validatePassword(password)) {
    //   return "Please enter a valid password";
    // }
    return null; // No validation error
  };

  const handleValidationError = (message) => {
    setShowError(message);
    // Ensure `closeToast` is passed correctly
    toast(
      <MessageReactToast message={message} closeToast={() => toast.dismiss()} />
    );
    setLoading(false);
  };

  const handleResponse = (isOk, data) => {
    if (!isOk || data.success === false) {
      const errorMessage = data.message || "An unexpected error occurred";
      setShowError(errorMessage);
      console.log(errorMessage);
      toast(
        <MessageReactToast
          message={errorMessage}
          closeToast={() => toast.dismiss()}
        />
      );
    } else {
      // Successful response logic here
      toast.success("Account created successfully");
      navigate("/login");
    }
  };

  const handleError = (error) => {
    const errorMessage = error.message || "An unexpected error occurred";
    setShowError(errorMessage);
    toast(
      <MessageReactToast
        message={errorMessage}
        closeToast={() => toast.dismiss()}
      />
    );
  };

  return (
    <div className="bg-white flex items-center justify-center mt-16">
      <div className="w-full max-w-lg p-6 sm:p-12 bg-gray-100 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">
          Sign Up
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
            type="email"
            placeholder="Email address"
            ref={emailRef}
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
            {loading ? "Loading...." : "Sign Up"}
          </button>
        </form>

        {/* Already have an account section */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Already have an account?</p>
          <Link to="/login">
            <button className="bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-300">
              Login
            </button>
          </Link>
          <OAuth/>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
