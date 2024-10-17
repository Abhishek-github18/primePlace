import mongoose from "mongoose";

const googleAccountUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    email:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
}, {
    timestamps: true})

const GoogleAccountUser = mongoose.model("GoogleAccountUser", googleAccountUserSchema);

export default GoogleAccountUser;







