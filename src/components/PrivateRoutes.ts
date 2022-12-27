import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useOutlet } from "react-router-dom";
import { api } from "../constant/constant";

export default function PrivateRoutes() {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const Outlet = useOutlet();

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
      const response = await axios.get(`${api}/user/check`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return Outlet;
}
