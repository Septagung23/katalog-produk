import { useEffect, useState } from "react";
import { useNavigate, Outlet, useOutletContext } from "react-router-dom";
import { api } from "../constant/constant";
import axios from "axios";

export default function PrivateRoutes() {
  const [data, setData] = useState<any>({});
  const [userId, setUserId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [navigate]);

  async function fetchData() {
    try {
      const token = window.localStorage.getItem("jwt");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.get(`${api}/auth/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      console.log("ID : ", response.data.user.id);
      setUserId(response.data.user.id);
    } catch (error: any) {
      console.log(error);
    }
  }
  return <Outlet context={{ userId }} />;
}
type ContextType = { userId: string | null };

export function useUserId() {
  return useOutletContext<ContextType>();
}
