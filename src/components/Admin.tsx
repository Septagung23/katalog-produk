import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useOutlet } from "react-router-dom";
import { api } from "../constant/constant";

export default function AdminRoutes() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();
  const Outlet = useOutlet();

  useEffect(() => {
    checkAdmin();
  }, [navigate]);

  async function checkAdmin() {
    try {
      const token = window.localStorage.getItem("jwt");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.get(`${api}/user/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsAdmin(true);
    } catch (error) {
      setIsAdmin(false);
      navigate("/");
      return;
    }
  }
  return Outlet;
}
