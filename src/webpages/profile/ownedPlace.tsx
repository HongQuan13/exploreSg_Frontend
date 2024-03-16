import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../components/partials/navBar";
import PlaceCard from "../../components/places/placeCard";
import ProfileOption from "../../components/partials/profileOption";
interface User {
  id: string;
  username: string;
  email: string;
}

const OwnedPlace = () => {
  const [ownedPlaceData, setOwnedPlace] = useState<any[]>([]);
  const [user, setUser] = useState<User>(
    {
      id: "",
      username: "",
      email: "",
    } || null
  );
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user-info") || ""));
  }, []);

  useEffect(() => {
    ownedPlace();
  }, [user]);

  const ownedPlace = async () => {
    if (user) {
      try {
        const ownedPlace = await axios.post(
          `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/v1/api/place/ownedPlace/${user.id}`,
          null,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          }
        );
        console.log("Return owned place success", ownedPlace.data.metadata);
        setOwnedPlace(ownedPlace?.data?.metadata);
      } catch (error: any) {
        console.error("Error:", error.response);
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-gray-100">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <ProfileOption user={user} />
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6 min-h-[500px]">
                <h2 className="text-xl font-bold mb-4">My Owned Places</h2>
                <hr className="my-6 border-t border-gray-300" />
                {ownedPlaceData.map((data) => (
                  <PlaceCard
                    link={`place/detail/${data._id}`}
                    title={data.place_title}
                    description={data.place_description}
                    location={data.place_location}
                    images={data.place_images[0].thumb_url}
                    price={data.place_price}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OwnedPlace;
