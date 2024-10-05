import { Link } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { validateEmail, validateUsername, validatePassword } from "../utils/validation";

const SignUp = () => {
  const [showError, setShowError] = useState(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if(!validateEmail(emailRef.current.value)){
      setShowError("Please enter a valid email address");
      console.log("Please enter a valid email address");
      return;
    }

    if(!validateUsername(usernameRef.current.value)){
      setShowError("Please enter a valid username");
      return;
    }

    if(!validatePassword(passwordRef.current.value)){
      setShowError("Please enter a valid password");
      return;
    }
    setShowError(null);
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
            Submit
          </button>
        </form>

        {
          showError && (
            <p className="text-red-500 text-center">
              {showError}
             </p>
          )
        }

        {/* Already have an account section */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Already have an account?</p>
          <Link to="/login">
            <button className="bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-300">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
