import { Listing } from "../models/listing.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createListing = async (req, res, next) => {
  try {
    const {
      title,
      description,
      address,
      offer,
      regularPrice,
      discountedPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      type,
      imageUrls,
      user,
    } = req.body;

    const listing = await Listing.create({
      title,
      description,
      address,
      offer,
      regularPrice,
      discountedPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      type,
      imageUrls,
      user,
    });

    console.log(listing);

    if(req.cookies.token){
      res.cookie("token", req.cookies.token, {
        httpOnly: true, // Prevents client-side JS access
        secure: true, // Required for HTTPS
        sameSite: "None", // Allows cross-origin requests
        maxAge: req.cookies.token.maxAge,
      });
    }

    res.status(200).json({
      status: true,
      message: "Listing created successfully",
      id: listing._id,
    });
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Internal server error"));
  }
};

/**
 * @api {delete} /api/listing/delete/:id Delete a listing
 * @apiName DeleteListing
 * @apiGroup Listing
 * @apiDescription Delete a listing by its id
 * @apiParam {String} id The id of the listing to delete
 * @apiSuccess {Boolean} status True if the listing was deleted, false if not
 * @apiSuccess {String} message The result message
 * @apiError {String} message The error message
 * @apiErrorExample {json} Unautho  rized
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "status": false,
 *      "message": "Unauthorized"
 *    }
 * @apiErrorExample {json} Internal Server error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "status": false,
 *      "message": "Internal server error"
 *    }
 */
export const deleteLisitng = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  console.log("listing", req.params.id);

  console.log("listing", listing);

  if (!listing) {
    res.status(404).json({
      status: false,
      message: "Listing not found",
    });
    return;
  }

  if (req.user.id !== listing.user) {
    res.status(401).json({
      status: false,
      message: "Unauthorized",
    });
    return;
  }

  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    console.log("Deleted listing", deletedListing);
    res.status(200).json({
      status: true,
      message: "Listing deleted successfully",
    });
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Internal server error"));
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.find({ _id: req.params.id });
    if (!listing) {
      res.status(404).json({
        status: false,
        message: "Listing not found",
      });
      return;
    }
    res.status(200).json({
      status: true,
      message: "Listings fetched successfully",
      listings: listing,
    });
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Internal server error"));
  }
};

export const getAllListing = async (req, res, next) => {
  // to debug the cookie issue in prod
  const token = req.cookies.token;

  const limit = req.query.limit || 9;

  // Offer filter
  let offer;
  if (req.query.offer === "true") {
    offer = true; // Only listings with offer = true
  } else if (req.query.offer === "false") {
    offer = false; // Only listings with offer = false
  } else {
    offer = { $in: [false, true] }; // Include all listings
  }

  // Parking filter
  let parking;
  if (req.query.parking === "true") {
    parking = true; // Only listings with parking = true
  } else if (req.query.parking === "false") {
    parking = false; // Only listings with parking = false
  } else {
    parking = { $in: [false, true] }; // Include all listings
  }

  let furnished;
  if (req.query.furnished === "true") {
    furnished = true; // Only listings with furnished = true
  } else if (req.query.furnished === "false") {
    furnished = false; // Only listings with furnished = false
  } else {
    furnished = { $in: [false, true] }; // Include all listings
  }

  let type;
  if (req.query.type === "rent") {
    type = "rent"; // Only listings with type = rent
  } else if (req.query.type === "sale") {
    type = "sale"; // Only listings with type = sale
  } else {
    type = { $in: ["rent", "sale"] }; // Include all listings
  }

  const sort = req.query.sort || "createdAt"; // Default sort by createdAt
  const order = req.query.order || "desc"; // Default order by desc
  console.log({
    offer,
    parking,
    furnished,
    type,
  });
  try {
    const Listings = await Listing.find({
      title: { $regex: req.query.title || "", $options: "i" },
      offer,
      parking,
      furnished,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit);

      if(token){
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
      }



    res.status(200).json({
      status: true,
      message: "Listings fetched successfully",
      listings: Listings,
    });
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Internal server error"));
  }
};
