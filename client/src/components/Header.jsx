import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) =>{
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("search", searchTerm);
    const searhQuery = urlParams.toString();
    navigate(`/search?${searhQuery}`);
  }

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    setSearchTerm(urlParams.get("search"));

  }, [location.search])

  return (
    <header className="bg-white shadow-md py-4">
      <div className="flex items-center justify-between mx-4 sm:mx-12">
        <Link to="/">
          <h1 className="font-bold text-xl sm:text-4xl pr-4">
            <span className="text-blue-500">Prime</span>
            <span className="text-blue-900">Place</span>
          </h1>
        </Link>
        <form onSubmit={handleSearch} className="flex border border-blue-500 rounded-lg overflow-hidden">
          <input
            className="md:px-4 py-2 focus:outline-none"
            type="text"
            value={searchTerm}
            placeholder="Find a property..."
            onChange={(e)=> setSearchTerm(e.target.value)}
          />
          <button className="bg-teal-500 px-4 py-2">
            <FaSearch className="text-white" />
          </button>
        </form>

        <ul className="flex gap-4">
          <Link to="/about">
            <li className="text-blue-900 font-medium hover:text-teal-500 transition duration-300 hidden sm:block cursor-pointer">
              About
            </li>
          </Link>

          <Link to="/profile">
            {/* <li className="text-blue-900 font-medium hover:text-teal-500 transition duration-300 hidden sm:block cursor-pointer">
              Profile
            </li> */}
            {user?.id ? (
              <div>
                <img
                  src={user.image}
                  alt="profile"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            ) : (
              <Link to="/login">
                <li className="text-blue-900 font-medium hover:text-teal-500 transition duration-300 cursor-pointer">
                  SignIn
                </li>
              </Link>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
