import mongoose from "mongoose";

export const ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    bathrooms:{
        type: Number,
        required: true,
    },
    bedrooms:{
        type: Number,
        required: true,
    },
    furnished: {
        type: Boolean,
        required: true,
    },
    parking:{
        type: Boolean,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    offer: {
        type: Boolean,
        required: true,
    },
    regularPrice: {
        type: Number,
        required: true,
    },
    discountedPrice:{
        type: Number,
        required: true,
    },
    imageUrls: {
        type: Array,
        required: true,
    },
    // user === owner, person who created the listing
    user:{
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

export const Listing = mongoose.model("Listing", ListingSchema);