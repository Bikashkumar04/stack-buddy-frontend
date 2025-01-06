import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res.data));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      setError(error?.response?.data);
      console.log(error);
    }
  };

  return (
    <>
      {error !== "" && (
        <div
          role="alert"
          className="alert alert-error"
          onClick={() => setError("")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
      {success === true && (
        <div className="toast toast-top toast-start">
          <div className="alert alert-success">
            <span>Profile Saved Successfully</span>
          </div>
          {/* <div className="alert alert-success">
            <span>Message sent successfully.</span>
          </div> */}
        </div>
      )}
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-neutral w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit your Profile</h2>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="number"
                  value={age}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <select
                  className="select select-bordered"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option disabled selected>
                    Pick one
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Others</option>
                </select>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Photo URL</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <textarea
                  value={about}
                  className="textarea textarea-bordered h-24"
                  placeholder="Bio"
                  onClick={(e) => setAbout(e.target.value)}
                ></textarea>
              </label>
              <div className="card-actions justify-center mt-4">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>
    </>
  );
};

export default EditProfile;
