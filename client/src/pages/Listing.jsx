import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaBed, FaParking } from "react-icons/fa";
import { MdOutlineBathroom } from "react-icons/md";
import { LuSofa } from "react-icons/lu";
import "swiper/css";
import "swiper/css/navigation";
import { useSelector } from "react-redux";
import Contact from "./Contact";

const Listing = () => {
  const params = useParams();
  const [listing, setListing] = useState();
  const [contactLandlord, setContactLandlord] = useState(false);
  const user = useSelector((state) => state?.user?.currentUser);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/listing/${params.listingId}`,{
          credentials: "include", // Ensure cookies are included in cross-origin requests

        });
        if (!response.ok) {
          toast.error("Something went wrong while fetching listing details");
        } else {
          const data = await response.json();
          setListing(data.listings[0]);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while fetching listing details");
      }
    };
    fetchData();
  }, []);

  const handleContactLandLord = () =>{
    if(!user){
    toast.error("You need to sign in to contact the landlord");
    return;
    }else{
      setContactLandlord(true);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Title and Badge */}
      {listing && (
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{listing.title}</h1>
          <span
            className={`px-4 py-2 text-white rounded-full text-sm ${
              listing.offer
                ? "bg-green-500"
                : listing.type === "rent"
                ? "bg-blue-500"
                : "bg-gray-500"
            }`}
          >
            {listing.offer
              ? "Offer Available"
              : listing.type === "rent"
              ? "For Rent"
              : "For Sale"}
          </span>
        </div>
      )}

      {/* Image Slider */}
      {listing && (
        <div className="mb-8">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            modules={[Navigation]}
            navigation
            autoplay={{ delay: 3000 }}
            className="rounded-lg overflow-hidden shadow-lg"
            loop={true}
          >
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div className="flex justify-center items-center">
                  <img
                    src={url}
                    alt="listing"
                    className="object-cover w-full h-[400px]"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Details Section */}
      {listing && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Description & Address */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Details
            </h2>
            <p className="text-gray-700 mb-4">{listing.description}</p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Address:</span>{" "}
              {listing.address}
            </p>
          </div>

          {/* Features */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Features
            </h2>
            <ul className="text-gray-700 space-y-4">
              <li className="flex items-center gap-2">
                <FaBed className="text-blue-500" />
                {listing.bedrooms} Bedroom(s)
              </li>
              <li className="flex items-center gap-2">
                <MdOutlineBathroom className="text-blue-500" />
                {listing.bathrooms} Bathroom(s)
              </li>
              <li className="flex items-center gap-2">
                <LuSofa
                  className={`${
                    listing.furnished ? "text-green-500" : "text-gray-500"
                  }`}
                />
                {listing.furnished ? "Furnished" : "Not Furnished"}
              </li>
              <li className="flex items-center gap-2">
                <FaParking
                  className={`${
                    listing.parking ? "text-green-500" : "text-gray-500"
                  }`}
                />
                {listing.parking ? "Parking Available" : "No Parking"}
              </li>
            </ul>
          </div>

          {/* Pricing */}
          <div className="bg-white p-6 shadow-md rounded-lg md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Pricing
            </h2>
            <p className="text-gray-700">
              <span className="font-medium text-gray-800">Regular Price:</span>{" "}
              ${listing.regularPrice}
            </p>
            {listing.offer && (
              <p className="text-gray-700">
                <span className="font-medium text-gray-800">
                  Discounted Price:
                </span>{" "}
                ${listing.discountedPrice}
              </p>
            )}
          </div>
        </div>
      )}
      {!contactLandlord && listing && user?.id !== listing.user && (
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={handleContactLandLord}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white text-lg font-medium rounded-lg shadow-md hover:shadow-lg hover:from-teal-600 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            Contact Landlord
          </button>
        </div>
      )}
      {contactLandlord && (
        <Contact listing={listing} setContactLandlord={setContactLandlord} />
      )}
    </div>
  );
};

export default Listing;
