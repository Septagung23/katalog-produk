import { TextField, Box, Button, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../constant/constant";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${api}/auth/register`, {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "absolute",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        background:
          "linear-gradient(51deg, rgba(0,212,255,1) 0%, rgba(13,13,156,1) 37%, rgba(20,20,134,1) 56%, rgba(13,13,156,1) 67%, rgba(0,212,255,1) 100%)",
      }}
    >
      <Box
        sx={{
          width: "auto",
          my: 5,
          backgroundColor: "lightblue",
          borderRadius: 15,
          position: "fixed",
        }}
      >
        <AccountCircleIcon sx={{ mt: 4, mb: 2 }} fontSize="large" />
        <Typography sx={{ mb: 5 }} variant="h4">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "auto",
            mx: 4,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexWrap: "wrap",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <TextField
            required
            id="outlined-required"
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            sx={{ mt: 3, mb: 1 }}
            variant="contained"
            color="primary"
            size="medium"
          >
            Register
          </Button>
          <Typography variant="caption">OR</Typography>
          <NavLink to="/login" style={{ textDecoration: "none" }}>
            <Button sx={{ mb: 4 }} color="primary" size="small">
              Login
            </Button>
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
}
