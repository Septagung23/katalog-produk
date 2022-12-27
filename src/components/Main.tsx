import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../constant/constant";
import BoxSx from "../assets/Hero";
import BasicCard from "../assets/Card";
import ResponsiveAppBar from "../assets/Navbar";

export default function HalUtama() {
  const [data, setData] = useState<any>({});
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdmin();
  }, [isAdmin]);

  const checkAdmin = async () => {
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
      console.log("RESULT:", data.user.role);

      if (data.user.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  console.log(isAdmin);
  return (
    <div className="App">
      <ResponsiveAppBar admin={isAdmin} />
      <BoxSx />
      <BasicCard admin={isAdmin} />
    </div>
  );
}
