import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { TextField, Button, Typography } from "@mui/material";
import BuildCircleRoundedIcon from "@mui/icons-material/BuildCircleRounded";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../constant/constant";

export default function Edit() {
  const { id } = useParams();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [sku, setSku] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const navigate = useNavigate();
  const token = window.localStorage.getItem("jwt");

  useEffect(() => {
    getProductById();
  }, []);
  const updateProduct = async (event: any) => {
    event.preventDefault();
    try {
      await axios.patch(
        `${api}/product/${id}`,
        {
          name,
          description,
          stock: parseInt(stock),
          sku,
          price: parseInt(price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  const getProductById = async () => {
    const response = await axios.get(`${api}/product/${id}`);
    console.log(response.data);
    setName(response.data.name);
    setDescription(response.data.description);
    setStock(response.data.stock);
    setSku(response.data.sku);
    setPrice(response.data.price);
  };

  return (
    <Box
      style={{
        width: "100%",
        height: "107vh",
        backgroundColor: "#caf0f8",
      }}
    >
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
          <BuildCircleRoundedIcon
            fontSize="large"
            sx={{ alignSelf: "center", mt: 2 }}
          />
          <Box
            sx={{
              alignSelf: "center",
            }}
          >
            <Typography sx={{ p: 2 }} variant="h5">
              Edit Product
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        component="form"
        onSubmit={updateProduct}
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
          id="outlined-Descriptionription"
          label="Descriptionription"
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
    </Box>
  );
}
