import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../constant/constant";
import BoxSx from "../assets/Hero";
import BasicCard from "../assets/Card";
import ResponsiveAppBar from "../assets/Navbar";

export default function HalUtama() {
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [id, setId] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    setIsLoading(true);
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
      console.log("RESULT:", response.data.user);
      if (response.data.user.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setId(response.data.user.id);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }
  };
  if (isLoading) {
    return <h1 style={{ top: "50%", left: "50%" }}>Wait a Sec ...</h1>;
  }

  return (
    <div className="App">
      <ResponsiveAppBar admin={isAdmin} />
      <BoxSx />
      <BasicCard admin={isAdmin} id={id} />
    </div>
  );
}
