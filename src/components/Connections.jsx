import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addConnection(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return <h1 className="flex justify-center py-56">No Connections Found</h1>;

  return (
    <div className="text-center pt-8 pb-72">
      <h1 className="text-2xl">Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, about, gender, photoUrl, age } =
          connection;

        return (
          <div
            key={connection._id}
            className="flex items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                src={photoUrl}
                alt="Profile Pic"
                className="max-w-20 max-h-20 w-auto h-auto rounded-full aspect-auto"
              />
            </div>
            <div className="text-left pl-7">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              <p>{gender && age && gender + ", " + age}</p>
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
