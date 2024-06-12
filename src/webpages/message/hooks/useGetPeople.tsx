import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/authContext";
import { axiosClient } from "../../../libs/axios";

function useGetPeople() {
  const [people, setPeople] = useState<any[]>([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const getPeople = async () => {
      try {
        const allPeople = await axiosClient.post(
          `/chat/allFriend/${authUser.id}`
        );
        console.log(allPeople.data.metadata);
        setPeople(allPeople.data.metadata);
      } catch (error: any) {
        console.log(error.response);
      }
    };
    getPeople();
  }, []);
  return people;
}

export default useGetPeople;
