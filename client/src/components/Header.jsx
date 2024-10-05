import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="flex items-center justify-between mx-4 sm:mx-12">
        <h1 className="font-bold text-3xl sm:text-4xl pr-4">
          <span className="text-blue-500">Prime</span>
          <span className="text-blue-900">Place</span>
        </h1>
        <form className="flex border border-blue-500 rounded-lg overflow-hidden">
          <input
            className="px-4 py-2 focus:outline-none"
            type="text"
            placeholder="Find a property..."
          />
          <button className="bg-teal-500 px-4 py-2">
            <FaSearch className="text-white" />
          </button>
        </form>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="text-blue-900 font-medium hover:text-teal-500 transition duration-300 hidden sm:block cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/profile">
            <li className="text-blue-900 font-medium hover:text-teal-500 transition duration-300 hidden sm:block cursor-pointer">
              Profile
            </li>
          </Link>
          <Link to="/login">
            <li className="text-blue-900 font-medium hover:text-teal-500 transition duration-300 cursor-pointer">
              SignIn
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
