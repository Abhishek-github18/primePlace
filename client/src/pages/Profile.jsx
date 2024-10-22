import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../utils/firebase";
import { deleteUserFails, deleteUserStart, deleteUserSuccess, signOutFailure, signOutStart, signOutSuccess, updateProfileFails, updateProfileSuccess } from "../redux/user/userSlice";
import { toast } from "react-toastify";
import { validateEmail, validatePassword } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [filePercentageUpload, setFilePercentageUpload] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [email, setEmail] = useState(user?.email);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          // console.log("File available at", downloadURL);
        });
      }
    );
  };

  const handleUpdateProfile = async () => {
    const password = passwordRef.current.value;
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
      const response = await fetch("/api/user/updateprofile", {
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

  const handleDeleteAccount = async () =>{

    try{
      dispatch(deleteUserStart());
      const response = await fetch("/api/user/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user?.id,
          oauth: user?.oauth
        }),
      });
      if(!response.ok){
        dispatch(deleteUserFails());
        const data = await response.json();
        console.error(data.message);
        toast.error(data.message);
      }else{
        dispatch(deleteUserSuccess());
        toast.success("Account deleted successfully");
        navigate('/login');
      }
    }catch(error){
      console.error("error", error);
      dispatch(deleteUserFails());
      toast.error("Some problem with deleting account");
    }

  }

  const handleSignOut = async () =>{
    dispatch(signOutStart());
    try{
      const response = await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user?.id,
          oauth: user?.oauth
        }),
      });
      if(!response.ok){
        const data = await response.json();
        console.error(data.message);
        toast.error(data.message);
        dispatch(signOutFailure());
      }else{
        toast.success("Signed out successfully");
        navigate('/login');
        dispatch(signOutSuccess());
      }
    }
    catch(error){
      dispatch(signOutFailure());
      console.error("error", error);
      toast.error("Some problem with signing out");
    }

  }

  return (
<div className="bg-white flex flex-col items-center justify-center mt-16">
  <div className="w-full max-w-lg p-6 sm:p-12 bg-gray-100 shadow-md rounded-lg">
    <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">
      Update Profile
    </h1>

    <div className="flex flex-col gap-4">
      {/* Image Upload Section */}
      <div className="flex flex-col items-center">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
        />
        <div className="w-32 h-32">
          <img
            src={fileUrl || user?.image}
            alt="profile_pic"
            className="w-full h-full rounded-full cursor-pointer border border-gray-300 hover:border-teal-500 hover:border-4 transition-all duration-300"
            onClick={() => fileRef.current.click()}
          />
        </div>
        {filePercentageUpload && filePercentageUpload < 100 && (
          <div className="text-teal-500">{`Uploading: ${filePercentageUpload.toFixed(
            2
          )}%`}</div>
        )}
      </div>

      {/* User Information */}
      <input
        type="text"
        value={user?.username}
        disabled
        className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={user?.oauth}
        className={`p-4 border border-gray-300 rounded-lg focus:outline-none ${
          user?.oauth
            ? "cursor-not-allowed bg-gray-200"
            : "focus:border-teal-500"
        }`}
      />
      <input
        type="password"
        placeholder="Enter new password"
        disabled={user?.oauth}
        ref={passwordRef}
        className={`p-4 border border-gray-300 rounded-lg focus:outline-none ${
          user?.oauth
            ? "cursor-not-allowed bg-gray-200"
            : "focus:border-teal-500"
        }`}
      />

      {/* Update Profile Button */}
      <button
        type="button"
        onClick={handleUpdateProfile}
        className="bg-blue-500 text-white p-4 rounded-lg hover:bg-teal-500 transition duration-300"
      >
        Update Profile
      </button>
    </div>
  </div>

  {/* Delete Account and Sign Out Buttons */}
  <div className="flex gap-4 mt-4 mb-8">
    <button
      onClick={handleDeleteAccount}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
    >
      Delete Account
    </button>
    <button
      onClick={handleSignOut}
      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
    >
      Sign Out
    </button>
  </div>
</div>

  );
};

export default Profile;
