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
        `/api/listing/search?${new URLSearchParams(sideBarData).toString()}`,
        {
          method: "GET",
        }
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
      searchTerm: urlParams.get("searchTerm") || "", // Default to an empty string
    }));
    console.log(urlParams.get("searchTerm"));
    console.log(sideBarData);
    fetchData();
  }, [location.search]);

  return (
    <div className="flex flex-wrap gap-6 p-4 md:flex-nowrap">
      {/* Search Container */}
      <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-bold mb-4">Search your favorite place</h4>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search with text"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) =>
              setSideBarData({ ...sideBarData, searchTerm: e.target.value })
            }
            value={sideBarData.searchTerm || ""} // Ensure it's always a string
          />

          {/* Type Options */}
          <div>
            <span className="font-medium">Type:</span>
            <div className="flex items-center space-x-4 mt-2">
              <label className="flex items-center">
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
              <label className="flex items-center">
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
              <label className="flex items-center">
                <input
                  type="radio"
                  id="sale"
                  name="type"
                  value="sale"
                  className="mr-2"
                  onChange={handleChange}
                  checked={sideBarData.type === "sale"}
                />
                Sell
              </label>
            </div>
          </div>

          {/* Offer */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="offer"
              name="offer"
              className="mr-2"
              onChange={handleChange}
              checked={sideBarData.offer}
            />
            <span>Offer</span>
          </div>

          {/* Amenities */}
          <div>
            <span className="font-medium">Amenities:</span>
            <div className="flex items-center space-x-4 mt-2">
              <label className="flex items-center">
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
              <label className="flex items-center">
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
            <span className="font-medium">Sort:</span>
            <select
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
              onChange={handleChange}
              value={sideBarData.sort}
              name="sort"
            >
              <option value="desc">Price High to Low</option>
              <option value="asc">Price Low to High</option>
              <option value="newest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>

      {/* Listing Result Container */}
      <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md flex">
        <h4 className="text-lg font-bold mb-4">Listing Results:</h4>
        <br />
        <div className="flex flex-wrap">
          {listing && listing.length > 0 ? (
            listing.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))
          ) : (
            <p>No listing found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
