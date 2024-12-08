import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Contact = ({ listing, setContactLandlord }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/user/${listing.user}`,{
          credentials: "include", // Ensure cookies are included in cross-origin requests

      });
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error(error);
        setContactLandlord(false);
      }
    };
    fetchUser();
  }, [listing, setContactLandlord]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 md:max-w-lg mx-auto mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Contact the Owner</h2>
        <button
          onClick={() => setContactLandlord(false)}
          className="text-sm text-red-500 hover:text-red-600 transition"
        >
          Close
        </button>
      </div>
      {user ? (
        <>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Owner Name:</span> {user.username}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Email:</span>{" "}
              <a
                href={`mailto:${user.email}`}
                className="text-blue-500 underline hover:text-blue-600"
              >
                {user.email}
              </a>
            </p>
          </div>
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            className="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
            rows="5"
          ></textarea>
          <Link
            to={`mailto:${user.email}?subject=Inquiry about ${listing.title}&body=${message}`}
            className="w-full block text-center py-3 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 transition"
          >
            Send Message
          </Link>
        </>
      ) : (
        <p className="text-sm text-gray-500">Loading owner details...</p>
      )}
    </div>
  );
};

// PropTypes Validation
Contact.propTypes = {
  listing: PropTypes.shape({
    user: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  setContactLandlord: PropTypes.func.isRequired,
};

export default Contact;
