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
