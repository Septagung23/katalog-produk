import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Outlet } from "react-router-dom";
import { api } from "../constant/constant";

export default function AdminRoutes() {
  const [data, setData] = useState<any>({});
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
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
      const response = await axios.get(`${api}/user/check`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      if (data.user.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error: any) {
      console.log(error);
    }
  }
  console.log(data);
  return <Outlet context={isAdmin} />;
}
