import { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Modal,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../constant/constant";

export default function BasicCard(props: any) {
  const [product, setProduct] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [addToCart, setAddToCart] = useState<null | HTMLElement>(null);
  const [data, setData] = useState<string>("");
  const [productName, setProductname] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const [itemError, setItemError] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleOpen = (p: string, pId: string) => {
    setOpen(true);
    setProductname(p);
    setProductId(pId);
  };
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  useEffect(() => {
    getproduct();
  }, []);

  const getproduct = async () => {
    const response = await axios.get(`${api}/product`);
    setProduct(response.data);
  };
  const token = window.localStorage.getItem("jwt");
  const deleteProduct = async (id: any) => {
    try {
      await axios.delete(`${api}/product/${id}`);
      getproduct();
    } catch (error: any) {
      console.log(error);
    }
  };

  const checkUser = async () => {
    try {
      await axios.get(`${api}/auth`);
    } catch (error) {}
  };

  const addtoCart = async (e: any, productId: string) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${api}/transaction`,
        {
          amount: parseInt(amount),
          userId: props.id,
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(productId);
    } catch (error: any) {
      console.log(error);
    }
  };

  let items;
  if (product) {
    items = product
      .filter((p) => {
        return p.name.indexOf(query) === 0;
      })
      .map((p) => (
        <Card
          key={p.id}
          sx={{ width: 200, m: 2, boxShadow: 3, borderRadius: 5 }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {p.name}
            </Typography>
            <Typography variant="caption" color="GrayText" component="div">
              {p.sku}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(p.price)}
            </Typography>
            <Typography variant="body2">{p.description}</Typography>
          </CardContent>
          {props.admin && (
            <>
              <Link to={`/edit/${p.id}`} style={{ textDecoration: "none" }}>
                <Button>Edit</Button>
              </Link>
              <Button color="error" onClick={() => deleteProduct(p.id)}>
                Delete
              </Button>
            </>
          )}
          {!props.admin && (
            <>
              <Button sx={{ mx: 1 }} onClick={() => handleOpen(p.name, p.id)}>
                Add to Cart
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute" as "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Amount of {productName}
                  </Typography>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    type="number"
                    required
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                  />
                  <Box
                    component="form"
                    onSubmit={(event) => addtoCart(event, productId)}
                    sx={{ mt: 2 }}
                  >
                    <Button variant="contained" type="submit">
                      Add
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </>
          )}
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
          justifyContent: "space-between",
          alignContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {items}
      </Box>
    </Box>
  );
}
