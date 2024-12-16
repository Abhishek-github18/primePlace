import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../utils/firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const id = useSelector((state) => state?.user?.currentUser?.id);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

  const handleImageUpload = async (e) => {
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
    } else {
      setImageUploadError(true);
      toast.error(
        "You can only upload up to 6 images per listing with each size of 2 MB max"
      );
    }
    setUploading(false);
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
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const index = parseInt(e.target.value, 10);

    setFormData((prevFormData) => ({
      ...prevFormData,
      imageUrls: prevFormData.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;

    setFormData((prevData) => {
      if (id === "sell" || id === "rent") {
        return { ...prevData, type: id };
      }
      if (type === "checkbox") {
        return { ...prevData, [id]: checked };
      }
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
    try {
      const response = await fetch(`${BASE_URL}/api/listing/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          user: id,
        }),
        credentials: "include",
      });

      const data = await response.json();
      if (data.status) {
        toast.success("Listing created successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("error", error);
      toast.error("Some problem with creating listing");
    }
  };

  return (
    <main className="flex items-center justify-center p-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-screen-lg mx-auto px-6 py-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-8">
          Create Listing
        </h1>
        <form className="grid grid-cols-1 gap-6" onSubmit={handleListing}>
          <input
            type="text"
            id="title"
            placeholder="Property title"
            minLength={10}
            maxLength={60}
            className="w-full p-3 border rounded focus:outline-none focus:border-teal-500"
            value={formData.name}
            onChange={handleChange}
          />

          <textarea
            id="description"
            placeholder="Description"
            className="w-full p-3 border rounded focus:outline-none focus:border-teal-500"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <input
            type="text"
            id="address"
            placeholder="Address"
            className="w-full p-3 border rounded focus:outline-none focus:border-teal-500"
            value={formData.address}
            onChange={handleChange}
          />

          <div className="flex gap-4">
            {formData.imageUrls.map((url, index) => (
              <div key={url} className="relative w-24 h-24">
                <img
                  src={url}
                  alt="Listing"
                  className="w-full h-full object-cover rounded border"
                />
                <button
                  value={index}
                  onClick={handleDelete}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="w-full p-3 border rounded focus:outline-none focus:border-teal-500"
          />

          <button
            type="button"
            onClick={handleImageUpload}
            className="bg-teal-500 text-white p-3 rounded hover:bg-teal-600"
          >
            {uploading ? "Uploading..." : "Upload Images"}
          </button>

          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
            disabled={uploading}
          >
            Create Listing
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateListing;
