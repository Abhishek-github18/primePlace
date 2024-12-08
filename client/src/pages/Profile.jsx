import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../utils/firebase";
import {
  updateProfileFails,
  updateProfileSuccess,
} from "../redux/user/userSlice";
import { toast } from "react-toastify";
import { validateEmail, validatePassword } from "../utils/validation";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [listingsVisible, setListingsVisible] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);

  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [filePercentageUpload, setFilePercentageUpload] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [email, setEmail] = useState(user?.email);
  const [listings, setListings] = useState([]);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    console.log("file", file);
    if (file?.name) {
      uploadFile(file);
    }
  }, [file]);

  const uploadFile = async (file) => {
    // Create a root reference
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;

    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentageUpload(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.error(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileUrl(downloadURL);
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const handleUpdateProfile = async () => {
    const password = passwordRef.current?.value;
    console.log("email", email);
    console.log("password", password);
    if (fileUrl) {
      console.log("fileUrl", fileUrl);
    }
    if (validateEmail(email) === false) {
      // uncomment this line in prod
      // if(password && validatePassword(password) === false) {

      // }
      toast.error("Please enter a valid email");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/user/updateprofile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          image: fileUrl,
          oauth: user?.oauth,
          id: user?.id,
        }),
        credentials: "include", // Ensure cookies are included in cross-origin requests

      });

      if (!response.ok) {
        console.error("Some problem with updating profile");
        const data = await response.json();
        updateProfileFails(data);
        console.log("data", data);
        toast.error(data.message);
      } else {
        const data = await response.json();
        console.log("data", data);
        dispatch(updateProfileSuccess(data));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Some problem with updating profile", error);
      toast.error("Some problem with updating profile");
      updateProfileFails(error);
    }
  };

 
  const getListings = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/user/listings/` + user?.id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure cookies are included in cross-origin requests

      });
      if (!response.ok) {
        toast.error("Some error while fetching the listings");
      } else {
        const data = await response.json();
        console.log("data", data);
        setListings(data.listings);
      }
      setListingsVisible(!listingsVisible);
      setPanelVisible(true);
    } catch (error) {
      console.error(error);
      toast.error("Some problem with getting listings");
    }
  };

  const handleEditListing = (listingId) => {
    navigate("/listing/update-listing/" + listingId);
    return;
  }

  const handleDeleteListing = async (listingId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/listing/delete/` + listingId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure cookies are included in cross-origin requests

      });
      if (!response.ok) {
        toast.error("Some problem with deleting listing");
      } else {
        toast.success("Listing deleted successfully");
        getListings();
      }
    } catch (error) {
      console.error(error);
      toast.error("Some problem with deleting listing");
    }
  };

  return (
<div className="bg-gray-50 min-h-screen py-8">
  {/* Main Container */}
  <div className="max-w-6xl mx-auto p-4 space-y-8">
    {/* Page Header */}
    <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-lg p-6">
      {/* Profile Section */}
      <div className="flex items-center gap-6">
        <div
          className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-teal-500 overflow-hidden"
          onClick={() => fileRef.current.click()}
        >
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
          <img
            src={fileUrl || user?.image}
            alt="profile_pic"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user?.username || "User"}</h2>
          <p className="text-gray-600 text-sm">{email}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 md:mt-0 flex gap-4">
        <button
          onClick={getListings}
          className="bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition"
        >
          Show Listings
        </button>
        <button
          onClick={()=> navigate("/listings/create-listing")}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
        >
          Create Listing
        </button>
      </div>
    </div>

    {/* Profile Update Section */}
    <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Update Profile</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          value={user?.username}
          disabled
          className="w-full p-3 border rounded-lg bg-gray-100"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={user?.oauth}
          className={`w-full p-3 border rounded-lg ${
            user?.oauth ? "bg-gray-100 cursor-not-allowed" : "focus:ring-2 focus:ring-teal-500"
          }`}
        />
        <input
          type="password"
          placeholder="Enter new password"
          disabled={user?.oauth}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
        />
        <button
          onClick={handleUpdateProfile}
          className="col-span-1 md:col-span-2 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
        >
          Update Profile
        </button>
      </div>
    </div>

    {/* Listings Section */}
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ${
        panelVisible ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ width: "95%", maxWidth: "600px" }}
    >
      <div className="p-6 h-full flex flex-col">
        <button
          onClick={() => setPanelVisible(false)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition self-end"
        >
          Close Panel
        </button>
        <div className="mt-6 overflow-y-auto flex-1 custom-scrollbar">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="mb-4 p-4 border border-gray-300 rounded-lg shadow-md"
            >
              <Link to={`/listings/${listing._id}`}>
                <h3 className="font-semibold text-blue-700">{listing.title}</h3>
                <p className="text-gray-600 mt-2">{listing.description}</p>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing_image"
                  className="w-full h-40 object-cover rounded-lg mt-2"
                />
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    onClick={() => handleEditListing(listing._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    onClick={() => handleDeleteListing(listing._id)}
                  >
                    Delete
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>
  
  );
};

export default Profile;
