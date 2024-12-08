import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ListingItem from "../components/ListingItem";

const Search = () => {
  const [sideBarData, setSideBarData] = useState({
    type: "all",
    furnished: false,
    offer: false,
    parking: false,
    sort: "price",
    searchTerm: "",
    order: "asc",
  });
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [listing, setListing] = useState();

  const navigate = useNavigate();

  // Handle changes for various input fields
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    if (name === "sort") {
      // Handle sorting logic
      const sortMap = {
        asc: { sort: "price", order: "asc" },
        desc: { sort: "price", order: "desc" },
        newest: { sort: "createdAt", order: "desc" },
        oldest: { sort: "createdAt", order: "asc" },
      };
      setSideBarData({ ...sideBarData, ...sortMap[value] });
      return;
    }

    // Update the state for other inputs
    setSideBarData({
      ...sideBarData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(sideBarData);
    navigate(`/search?${new URLSearchParams(sideBarData).toString()}`);
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/listing/search?${new URLSearchParams(sideBarData).toString()}`,
        {
          method: "GET",
          credentials: "include", // Ensure cookies are included in cross-origin requests

        }// Ensure cookies are included in cross-origin requests

      );

      const data = await response.json();
      console.log(data);
      setListing(data.listings);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setSideBarData((prevState) => ({
      ...prevState,
      searchTerm: urlParams.get("searchTerm") || "",
      type: urlParams.get("type") || "all",
    furnished: urlParams.get("furnished") === "true" || false,
    offer: urlParams.get("offer") === "true" || false,
    parking: urlParams.get("parking") === "true" || false,
    sort: urlParams.get("sort") || "price",
    order: urlParams.get("order") || "asc",
    }));
    fetchData();
  }, [location.search]);

  return (
    <div className="flex flex-wrap gap-8 p-6 md:flex-nowrap">
    {/* Search Container */}
    <div className="w-full md:w-1/3 bg-white p-8 rounded-xl shadow-lg">
      <h4 className="text-2xl font-bold text-gray-800 mb-6">Search for Your Favorite Place</h4>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for location or property"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) =>
            setSideBarData({ ...sideBarData, searchTerm: e.target.value })
          }
          value={sideBarData.searchTerm || ""}
        />
  
        {/* Type Options */}
        <div>
          <span className="font-semibold text-gray-700">Property Type:</span>
          <div className="flex items-center space-x-6 mt-4">
            <label className="flex items-center text-gray-600">
              <input
                type="radio"
                id="all"
                name="type"
                value="all"
                className="mr-2"
                onChange={handleChange}
                checked={sideBarData.type === "all"}
              />
              Rent & Sell
            </label>
            <label className="flex items-center text-gray-600">
              <input
                type="radio"
                id="rent"
                name="type"
                value="rent"
                className="mr-2"
                onChange={handleChange}
                checked={sideBarData.type === "rent"}
              />
              Rent
            </label>
            <label className="flex items-center text-gray-600">
              <input
                type="radio"
                id="sale"
                name="type"
                value="sale"
                className="mr-2"
                onChange={handleChange}
                checked={sideBarData.type === "sale"}
              />
              Sale
            </label>
          </div>
        </div>
  
        {/* Offer Checkbox */}
        <div className="flex items-center text-gray-600">
          <input
            type="checkbox"
            id="offer"
            name="offer"
            className="mr-3"
            onChange={handleChange}
            checked={sideBarData.offer}
          />
          <span>Show Offers</span>
        </div>
  
        {/* Amenities */}
        <div>
          <span className="font-semibold text-gray-700">Amenities:</span>
          <div className="flex items-center space-x-6 mt-4">
            <label className="flex items-center text-gray-600">
              <input
                type="checkbox"
                id="parking"
                name="parking"
                className="mr-2"
                onChange={handleChange}
                checked={sideBarData.parking}
              />
              Parking
            </label>
            <label className="flex items-center text-gray-600">
              <input
                type="checkbox"
                id="furnished"
                name="furnished"
                className="mr-2"
                onChange={handleChange}
                checked={sideBarData.furnished}
              />
              Furnished
            </label>
          </div>
        </div>
  
        {/* Sort Options */}
        <div>
          <span className="font-semibold text-gray-700">Sort By:</span>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm mt-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            name="sort"
          >
            <option value="desc">Price: High to Low</option>
            <option value="asc">Price: Low to High</option>
            <option value="newest">Newest Listings</option>
            <option value="oldest">Oldest Listings</option>
          </select>
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Search
        </button>
      </form>
    </div>
  
    {/* Listing Result Container */}
    <div className="w-full md:w-2/3 bg-white p-8 rounded-xl shadow-lg">
      <h4 className="text-2xl font-bold text-gray-800 mb-6">Listing Results:</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listing && listing.length > 0 ? (
          listing.map((listing) => (
            <ListingItem listing={listing} key={listing._id} />
          ))
        ) : (
          <p className="text-gray-500">No listings found</p>
        )}
      </div>
    </div>
  </div>
  
  );
};

export default Search;
