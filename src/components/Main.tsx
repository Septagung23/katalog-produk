import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../constant/constant";
import axios from "axios";
import BoxSx from "../assets/Hero";
import BasicCard from "../assets/Card";
import ResponsiveAppBar from "../assets/Navbar";
import { Box, Paper } from "@mui/material/";

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

  if (isLoading === true) {
    return (
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Wait a Sec ...
      </h1>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#caf0f8",
      }}
    >
      <ResponsiveAppBar admin={isAdmin} />
      <BoxSx />
      <BasicCard admin={isAdmin} id={id} />
    </Box>
  );
}
