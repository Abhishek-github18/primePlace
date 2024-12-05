import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const Listing = () => {
  const params = useParams();
  const [listing, setListing] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/listing/${params.listingId}`);
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

  return (
    <div>
      <h1>{listing?.title}</h1>

      {listing && (
        <>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            modules={[Navigation]} // Add the Navigation module
            navigation // Enable navigation
            autoplay={{ delay: 3000 }}
          >
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "40%", height: "40%"
                  }}
                >
                  <img
                    src={url}
                    alt="listing"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
};

export default Listing;
