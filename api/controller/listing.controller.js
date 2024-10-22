import { Listing } from "../models/listing.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createListing = async (req, res, next) => {
    try{
        const { title, description, address, offer, price, discountedPrice, bathrooms, bedrooms, furnished, parking, type, imageUrls, user } = req.body;

        const listing = await Listing.create({
            title,
            description,
            address,
            offer,
            price,
            discountedPrice,
            bathrooms,
            bedrooms,
            furnished,
            parking,
            type,
            imageUrls,
            user
        });

        console.log(listing);

        res.status(200).json({
            status: true,
            message: "Listing created successfully", 
            id: listing._id
        });

    }catch(error){
        console.error(error);
        next(errorHandler(500, "Internal server error"));
    }
}