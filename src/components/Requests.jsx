import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/pending", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addRequest(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1>No pending requests</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-2xl">Connections Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, about, gender, photoUrl, age } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                src={photoUrl}
                alt="Profile Pic"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              <p>{gender && age && gender + ", " + age}</p>
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-4">Primary</button>
              <button className="btn btn-secondary mx-4">Secondary</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
