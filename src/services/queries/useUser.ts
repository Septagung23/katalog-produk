import { useQuery } from "@tanstack/react-query";
import { userResponse } from "../../types/types";
import axios from "../axios";

const handleRequest = async () => {
  const { data } = await axios.get<userResponse>("/api/user-info");
  return data.user;
};

export default function useUser() {
  return useQuery<userResponse["user"]>("dataUser", handleRequest);
}
