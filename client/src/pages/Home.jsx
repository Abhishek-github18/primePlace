import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

const Home = () => {
  const [offerListing, setOfferListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    fetchOfferListing();
    fetchSaleListing();
    fetchRentListing();
  }, []);

  const fetchOfferListing = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/listing/search?offer=true`);
      const data = await response.json();
      setOfferListing(data.listings);
    } catch (error) {
      toast.error("Something went wrong while fetching offer listings.");
    }
  };

  const fetchSaleListing = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/listing/search?type=sale`);
      const data = await response.json();
      setSaleListing(data.listings);
    } catch (error) {
      toast.error("Something went wrong while fetching sale listings.");
    }
  };

  const fetchRentListing = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/listing/search?type=rent`);
      const data = await response.json();
      setRentListing(data.listings);
    } catch (error) {
      toast.error("Something went wrong while fetching rent listings.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[400px] w-full"
        style={{
          backgroundImage:
            'url("https://imgs.search.brave.com/EUvndbsfxNzczKM-aS9F5VqyhgZz8IrFVC7h6KJckFI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy81OHdl/Yi0xNDg4ODIwMTAx/LmpwZz9jcm9wPTF4/dzoxeGg7Y2VudGVy/LHRvcCZyZXNpemU9/OTgwOio")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold">
            Find Your Dream Home
          </h1>
          <p className="text-sm md:text-lg mt-2">
            Discover listings for sale, rent, or with amazing offers!
          </p>
          <button
            onClick={() => navigate("/search")}
            className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition text-sm md:text-lg"
          >
            Explore Listings
          </button>
        </div>
      </div>

      {/* Offer Listings Carousel */}
      <section className="max-w-screen-xl mx-auto mt-12 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg md:text-2xl font-bold text-gray-800">
            Top Offers
          </h2>
          <button
            onClick={() => navigate("/search?offer=true")}
            className="px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition text-sm"
          >
            View More Offers
          </button>
        </div>
        <div className="relative">
          <div className="flex space-x-4 overflow-x-auto custom-scrollbar scrollbar-hide">
            {offerListing.length > 0 ? (
              offerListing.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))
            ) : (
              <p className="text-gray-500">No offers available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Rent Listings */}
      <section className="max-w-screen-xl mx-auto mt-12 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg md:text-2xl font-bold text-gray-800">
            Rent Listings
          </h2>
          <button
            onClick={() => navigate("/search?type=rent")}
            className="px-3 md:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition text-sm"
          >
            View More Rentals
          </button>
        </div>
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {rentListing.length > 0 ? (
            rentListing.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))
          ) : (
            <p className="text-gray-500">No rent listings available.</p>
          )}
        </div>
      </section>

      {/* Sale Listings */}
      <section className="max-w-screen-xl mx-auto mt-12 px-4 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg md:text-2xl font-bold text-gray-800">
            Homes for Sale
          </h2>
          <button
            onClick={() => navigate("/search?type=sale")}
            className="px-3 md:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition text-sm"
          >
            View More Sales
          </button>
        </div>
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {saleListing.length > 0 ? (
            saleListing.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))
          ) : (
            <p className="text-gray-500">No sale listings available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
