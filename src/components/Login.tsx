import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../constant/constant";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import {
  TextField,
  Box,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${api}/auth/login`, {
        username,
        password,
      });
      const token = response.data.token;
      window.localStorage.setItem("jwt", token);
      navigate("/");
      console.log(response.data);
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
        <LockIcon sx={{ mt: 4, mb: 2 }} />
        <Typography sx={{ mb: 5 }} variant="h4">
          Sign In
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
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            type={showPassword ? "text" : "password"}
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showPassword}
                onChange={(event) => setShowPassword(event.target.checked)}
              />
            }
            label="Show Password"
          />
          <Button
            type="submit"
            sx={{ mt: 3, mb: 1 }}
            variant="contained"
            color="primary"
            size="medium"
          >
            Login
          </Button>
          <Typography variant="caption">OR</Typography>
          <NavLink to="/register" style={{ textDecoration: "none" }}>
            <Button sx={{ mb: 4 }} color="primary" size="small">
              Register
            </Button>
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
}
