import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { app } from "../utils/firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UpdateListing = () => {
  const [files, setFiles] = new useState([]);
  const [imageUploadError, setImageUploadError] = new useState(false);
  const [uploading, setUploading] = useState(false);
  const id = useSelector((state) => state?.user?.currentUser?.id);
  const params = useParams();
  const [listing, setListing] = useState();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: "",
    bathrooms: "",
    parking: false,
    furnished: false,
    offer: false,
    discountedPrice: 0,
    regularPrice: 0,
    imageUrls: [],
  });

  console.log(formData);
  const handleImageUpload = async (e) => {
    // const files = e.target.files;
    console.log(files);
    e.preventDefault();
    const promises = [];
    setUploading(true);
    if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
      for (let i = 0; i < files.length; ++i) {
        promises.push(imageUpload(files[i]));
      }
      await Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
        })
        .catch((error) => {
          console.error(error);
          setImageUploadError(true);
          toast.error("Something went wrong while uploading images");
        });
      setImageUploadError(false);
      setUploading(false);
    } else {
      setImageUploadError(true);
      setUploading(false);
      toast.error(
        "You can only upload up to 6 images per listing with each size of 2 mb max"
      );
      return;
    }

    // console.log(formData);
  };

  const imageUpload = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log("File available at", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const index = parseInt(e.target.value, 10); // Convert index to a number
    console.log("index", index);

    setFormData((prevFormData) => ({
      ...prevFormData,
      imageUrls: prevFormData.imageUrls.filter((url, i) => i !== index),
    }));

    console.log("Updated formData:", formData);
  };

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;

    setFormData((prevData) => {
      // Handle "type" (Sell or Rent) exclusively
      if (id === "sell" || id === "rent") {
        return { ...prevData, type: id };
      }

      // Handle boolean fields (Parking, Furnished, Offer)
      if (type === "checkbox") {
        return { ...prevData, [id]: checked };
      }

      // For other fields (general case)
      return { ...prevData, [id]: value };
    });
  };

  const handleListing = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
    if (formData.offerPrice > formData.regularPrice) {
      toast.error("Offer price cannot be greater than regular price");
      return;
    }
    // console.log(id);
    try {
      const response = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          user: id,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.status == true) {
        toast.success("Listing created successfully");
        // navigate("/profile");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("error", error);
      toast.error("Some problem with creating listing");
    }
  };
  const getListingDetails = async () => {
    console.log(params.listingId);  
    try {
      const response = await fetch(
        `/api/listing/${params.listingId}`
      );
      const data = await response.json();
      console.log(data);
      if (data.status == false) {
        toast.error(data.message);
        return;
      }
      setListing(data.listings[0]);
    } catch (error) {
      console.error(error);
      toast.error("Some problem with getting listing details");
    }
  };
  useEffect(() => {
    getListingDetails();
  }, []);
  return (
    <main className="flex items-center justify-center p-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-screen-sm sm:max-w-screen-md lg:max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-blue-900 mb-8">
          Update Listing
        </h1>
        <form className="grid grid-cols-1 gap-6" onSubmit={handleListing}>
          {/* Property Title */}
          <div>
            <input
              type="text"
              id="title"
              placeholder="Property title"
              minLength={10}
              maxLength={60}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div>
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Address */}
          <div>
            <input
              type="text"
              id="address"
              placeholder="Address"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* Checkbox Options */}
          <div className="flex flex-wrap gap-4">
            {["Sell", "Rent", "Parking Spot", "Furnished", "Offer"].map(
              (label) => (
                <div key={label} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={label.toLowerCase().replace(" ", "")}
                    onChange={handleChange}
                    checked={
                      label === "Sell"
                        ? formData.type === "sell"
                        : label === "Rent"
                        ? formData.type === "rent"
                        : formData[label.toLowerCase().replace(" ", "")]
                    }
                  />
                  <label
                    htmlFor={label.toLowerCase().replace(" ", "")}
                    className="text-gray-700"
                  >
                    {label}
                  </label>
                </div>
              )
            )}
          </div>

          {/* Bedrooms and Bathrooms */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="bedrooms" className="block text-gray-700">
                Beds
              </label>
              <input
                type="number"
                id="bedrooms"
                min={1}
                max={10}
                onChange={handleChange}
                value={formData.bedrooms}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label htmlFor="bathrooms" className="block text-gray-700">
                Bathrooms
              </label>
              <input
                type="number"
                id="bathrooms"
                min={1}
                max={10}
                onChange={handleChange}
                value={formData.bathrooms}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* Pricing Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="regularPrice" className="block text-gray-700">
                Regular Price (Rs/month)
              </label>
              <input
                type="number"
                id="regularPrice"
                placeholder="Enter price"
                onChange={handleChange}
                value={formData.regularPrice}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label htmlFor="offerPrice" className="block text-gray-700">
                Offer Price (Rs/month)
              </label>
              <input
                type="number"
                id="offerPrice"
                onChange={handleChange}
                value={formData.offerPrice}
                disabled={!formData.offer}
                placeholder="Discounted price"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-teal-500 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="images" className="block text-gray-700">
              Images (max 6)
            </label>
            <input
              type="file"
              id="images"
              accept="image/*"
              onChange={(e) => setFiles(e.target.files)}
              multiple
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.imageUrls.map((url, index) => (
                <div key={url} className="relative w-24 h-24">
                  <img
                    src={url}
                    alt="Listing"
                    className="w-full h-full object-cover rounded border border-gray-300"
                  />
                  <button
                    value={index}
                    onClick={handleDelete}
                    className="absolute top-1 right-1 bg-red-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              type="button"
              onClick={handleImageUpload}
              className="w-full sm:w-auto bg-teal-500 text-white p-3 rounded hover:bg-teal-600"
            >
              {uploading ? "Uploading..." : "Upload Images"}
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
              disabled={uploading}
            >
              Create Listing
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UpdateListing;
