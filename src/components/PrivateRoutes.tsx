import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Outlet } from "react-router-dom";
import { api } from "../constant/constant";

export default function PrivateRoutes() {
  const [data, setData] = useState<any>({});
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
    } catch (error: any) {
      console.log(error);
    }
  }
  return <Outlet />;
}
