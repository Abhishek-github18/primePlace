import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ListingItem = ({
  listing: {
    _id,
    imageUrls,
    title,
    type,
    address,
    bedrooms,
    bathrooms,
    regularPrice,
    discountedPrice,
    parking,
    furnished,
  },
}) => {
  return (
    <div className="max-w-sm w-full p-4">
      <Link to={`/listings/${_id}`} className="block hover:shadow-lg transition-shadow duration-300">
        <div className="bg-white rounded-lg shadow-md overflow-hidden group">
          {/* Image */}
          <div className="relative h-48 bg-gray-200 overflow-hidden">
            <img
              src={imageUrls[0]}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-500 group-hover:bg-opacity-20"></div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            {/* Title */}
            <h2 className="text-xl font-bold truncate">{title}</h2>

            {/* Address */}
            <p className="text-sm text-gray-600 truncate">{address}</p>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Type:</span> {type}
              </p>
              <p>
                <span className="font-medium">Price:</span>{" "}
                {discountedPrice > 0 ? (
                  <>
                    <span className="line-through text-gray-400">
                      ${regularPrice}
                    </span>{" "}
                    <span className="text-green-600">${discountedPrice}</span>
                  </>
                ) : (
                  `$${regularPrice}`
                )}
              </p>
              <p>
                <span className="font-medium">Beds:</span> {bedrooms}
              </p>
              <p>
                <span className="font-medium">Baths:</span> {bathrooms}
              </p>
              <p>
                <span className="font-medium">Parking:</span>{" "}
                {parking ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-medium">Furnished:</span>{" "}
                {furnished ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

ListingItem.propTypes = {
  listing: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discountedPrice: PropTypes.number,
    parking: PropTypes.bool.isRequired,
    furnished: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ListingItem;
