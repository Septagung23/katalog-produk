import { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../constant/constant";

export default function BasicCard() {
  const [product, setProduct] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    getproduct();
  }, []);

  const getproduct = async () => {
    const response = await axios.get(`${api}/product`);
    setProduct(response.data);
  };

  const deleteProduct = async (id: any) => {
    try {
      await axios.delete(`${api}/product/${id}`);
      getproduct();
    } catch (error: any) {
      console.log(error);
    }
  };

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

  let items;
  if (product) {
    items = product
      .filter((p) => {
        return p.name.indexOf(query) === 0;
      })
      .map((p) => (
        <Card key={p.id} sx={{ width: 200, m: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {p.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(p.price)}
            </Typography>
            <Typography variant="body2">{p.description}</Typography>
            {isAdmin && (
              <>
                <Link to={`/edit/${p.id}`} style={{ textDecoration: "none" }}>
                  <Button>Edit</Button>
                </Link>
                <Button onClick={() => deleteProduct(p.id)}>Delete</Button>
              </>
            )}
          </CardContent>
        </Card>
      ));
  }

  return (
    <Box
      sx={{
        width: "auto",
        m: 4,
      }}
    >
      <Box component="form">
        <TextField
          id="search"
          label="Search Product"
          variant="standard"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </Box>
      <Box
        sx={{
          width: "auto",
          m: 4,
          display: "flex",
          justifyContent: "space-around",
          alignContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {items}
      </Box>
    </Box>
  );
}
