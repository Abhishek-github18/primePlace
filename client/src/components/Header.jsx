import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserFails, deleteUserStart, deleteUserSuccess } from "../redux/user/userSlice";
import { signOutFailure, signOutStart, signOutSuccess } from "../redux/user/userSlice";
import { toast } from "react-toastify";

const Header = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searhQuery = urlParams.toString();
    console.log("searhQuery", searhQuery);
    navigate(`/search?${searhQuery}`);
  };

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setSearchTerm(urlParams.get("searchTerm"));
  }, [location.search]);

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const response = await fetch(`${BASE_URL}/api/user/deleteUser`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user?.id,
          oauth: user?.oauth,
        }),
        credentials: "include", // Ensure cookies are included in cross-origin requests

      });
      if (!response.ok) {
        dispatch(deleteUserFails());
        const data = await response.json();
        console.error(data.message);
        toast.error(data.message);
      } else {
        dispatch(deleteUserSuccess());
        toast.success("Account deleted successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error("error", error);
      dispatch(deleteUserFails());
      toast.error("Some problem with deleting account");
    }
  };

  const handleSignOut = async () => {
    dispatch(signOutStart());
    try {
      const response = await fetch(`${BASE_URL}/api/auth/signout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user?.id,
          oauth: user?.oauth,
        }),
        credentials: "include", // Ensure cookies are included in cross-origin requests

      });
      if (!response.ok) {
        const data = await response.json();
        console.error(data.message);
        toast.error(data.message);
        dispatch(signOutFailure());
      } else {
        toast.success("Signed out successfully");
        navigate("/login");
        dispatch(signOutSuccess());
      }
    } catch (error) {
      dispatch(signOutFailure());
      console.error("error", error);
      toast.error("Some problem with signing out");
    }
  };


  return (
    <header className="bg-white shadow-md py-4">
    <div className="flex items-center justify-between mx-4 sm:mx-12">
      {/* Logo */}
      <Link to="/" className="flex-shrink-0">
        <h1 className="font-bold text-xl sm:text-4xl text-center sm:text-left">
          <span className="text-blue-500 block sm:inline">Prime</span>
          <span className="text-blue-900 block sm:inline">Place</span>
        </h1>
      </Link>
  
      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex border border-blue-500 rounded-lg overflow-hidden flex-grow mx-4"
      >
        <input
          className="px-2 md:px-4 py-2 flex-grow focus:outline-none"
          type="text"
          value={searchTerm}
          placeholder="Find a property..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-teal-500 px-3 py-2 md:px-4">
          <FaSearch className="text-white" />
        </button>
      </form>
  
      {/* Navigation Links */}
      <ul className="flex items-center gap-4 flex-shrink-0">
        {/* About Link */}
        <Link to="/about">
          <li className="text-blue-900 font-medium hover:text-teal-500 transition duration-300 hidden sm:block cursor-pointer">
            About
          </li>
        </Link>
        {/* Profile/Sign-In */}
        {user?.id ? (
      <div className="relative">
        {/* Profile Toggle */}
        <button
          className="flex items-center focus:outline-none"
          onClick={() => setProfileDropdownVisible(!profileDropdownVisible)}
        >
          <img
            src={user.image}
            alt="profile"
            className="w-10 h-10 rounded-full border border-gray-300 object-cover"
          />
        </button>
        {profileDropdownVisible && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 z-10">
            <button
              onClick={() => navigate("/profile")}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
            >
              View Profile
            </button>
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
            >
              Sign Out
            </button>
            <button
              onClick={handleDeleteAccount}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
            >
              Delete Account
            </button>
          </div>
        )}
      </div>
    ) : (
      <Link to="/login" className="text-blue-900 font-medium hover:text-teal-500 transition">
        Sign In
      </Link>
    )}     
      </ul>
    </div>
  </header>
    );
};

export default Header;
