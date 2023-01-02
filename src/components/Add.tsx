import { useState } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { api } from "../constant/constant";

export default function Add() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [sku, setSku] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  const createProduct = async (event: any) => {
    event.preventDefault();
    try {
      await axios.post(`${api}/product`, {
        name,
        description,
        stock: parseInt(stock),
        sku,
        price: parseInt(price),
      });
      navigate("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div style={{ backgroundColor: "#caf0f8" }}>
      <Box
        sx={{
          width: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "50%",
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "#bde0fe",
            borderRadius: 5,
            mt: 4,
          }}
        >
          <AddCircleRoundedIcon
            fontSize="large"
            sx={{ alignSelf: "center", mt: 2 }}
          />
          <Box
            sx={{
              alignSelf: "center",
            }}
          >
            <Typography sx={{ p: 2 }} variant="h5">
              Add Product
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        component="form"
        onSubmit={createProduct}
        sx={{
          width: "auto",
          m: 4,
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "space-around",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <label>Nama Produk</label>
        <TextField
          required
          fullWidth
          id="outlined-name"
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label>Deskripsi Produk</label>
        <TextField
          required
          fullWidth
          id="outlined-Description"
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <label>Stok Produk</label>
        <TextField
          required
          fullWidth
          id="outlined-Stock"
          label="Stock"
          type="number"
          value={stock}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={(event) => setStock(event.target.value)}
        />
        <label>SKU Produk</label>
        <TextField
          required
          fullWidth
          id="outlined-SKU"
          label="SKU"
          value={sku}
          onChange={(event) => setSku(event.target.value)}
        />
        <label>Harga Produk</label>
        <TextField
          required
          fullWidth
          id="outlined-Price"
          label="Price"
          type="number"
          value={price}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={(event) => setPrice(event.target.value)}
        />

        <Button type="submit" variant="outlined" color="primary">
          Submit
        </Button>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="outlined" color="error">
            Back
          </Button>
        </Link>
      </Box>
    </div>
  );
}
