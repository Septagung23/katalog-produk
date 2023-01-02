import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../constant/constant";
import { useUserId } from "./PrivateRoutes";
import ResponsiveAppBar from "../assets/Navbar";
import axios from "axios";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import sumArray from "../utils/sumArray";
import {
  Box,
  Typography,
  Divider,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Button,
} from "@mui/material";

export default function Cart() {
  const [product, setProduct] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subTotal, setSubTotal] = useState<any>();
  const [amount, setAmount] = useState<string>("");
  const { userId } = useUserId();
  const navigate = useNavigate();

  // let transactionId: any = product.map((t) => {
  //   console.log(t.transaction.id);
  // });

  let sub: any = product.map((p) => {
    return <div key={p.id}>{p.subtotal}</div>;
  });

  let subArr: any = product.map((pArr) => {
    return pArr.subtotal;
  });

  useEffect(() => {
    getTransaction();
  }, [userId]);

  const getTransaction = async () => {
    setIsLoading(true);
    try {
      const token = window.localStorage.getItem("jwt");
      const res = await axios.get(`${api}/transaction/item/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduct(res.data);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const increaseAmount = async (id: string, amount: string) => {
    try {
      const inc = await axios.patch(`${api}/transaction/item-increase/${id}`, {
        amount: parseInt(amount),
      });
      getTransaction();
    } catch (error: any) {
      console.log(error);
    }
  };

  const decreaseAmount = async (id: string, amount: string) => {
    try {
      await axios.patch(`${api}/transaction/item-decrease/${id}`, {
        amount: parseInt(amount),
      });
      getTransaction();
    } catch (error: any) {
      console.log(error);
    }
  };

  const deleteProduct = async (id: any) => {
    console.log(id);
    try {
      await axios.delete(`${api}/transaction/item/${id}`);
      getTransaction();
    } catch (error: any) {
      console.log(error);
    }
  };

  const checkOut = async (transactionId: string) => {
    try {
      await axios.patch(`${api}/transaction/checkout`, {
        transactionId: parseInt(transactionId),
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  if (isLoading === true) {
    return (
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Wait a Sec ...
      </h1>
    );
  }

  return (
    <>
      <ResponsiveAppBar admin={isAdmin} />
      <Box
        sx={{
          width: "100%",
          height: 1,
          position: "fixed",
          backgroundColor: "#caf0f8",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            backgroundColor: "#caf0f8",
          }}
        >
          <Box
            sx={{
              width: "60%",
              height: "auto",
              borderRadius: 5,
              m: 1,
              backgroundColor: "white",
            }}
          >
            <Typography variant="h4" sx={{ m: 2, mb: 1 }}>
              Cart
            </Typography>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Remove Item</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {product.map((p) => (
                    <TableRow
                      key={p.product.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {p.product.name}
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            onClick={() => decreaseAmount(p.id, p.amount)}
                          >
                            <RemoveCircleRoundedIcon color="error" />
                          </Button>
                          <Box>{p.amount}</Box>
                          <Button
                            onClick={() => increaseAmount(p.id, p.amount)}
                          >
                            <AddCircleRoundedIcon />
                          </Button>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(p.product.price)}
                      </TableCell>
                      <TableCell align="center">
                        {p.transaction.status}
                      </TableCell>
                      <TableCell align="center">
                        <Button onClick={() => deleteProduct(p.id)}>
                          <DeleteRoundedIcon color="error" fontSize="large" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box
            sx={{
              width: "40%",
              backgroundColor: "lightgoldenrodyellow",
              borderTopLeftRadius: 5,
              borderBottomRightRadius: 5,
              m: 1,
              ml: 0,
            }}
          >
            <Typography variant="h4" sx={{ m: 2, mb: 1 }}>
              Check Out
            </Typography>
            <Divider />
            <Box
              sx={{
                display: "block",
                mx: 2,
                my: 4,
              }}
            >
              <Typography variant="overline">Subtotal</Typography>
              <Typography sx={{ textAlign: "right" }} variant="overline">
                {sub}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mx: 2,
                mb: 4,
              }}
            ></Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mx: 2,
                my: 4,
              }}
            >
              <Typography variant="overline">Total</Typography>
              <Typography variant="overline">{sumArray(subArr)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button sx={{ mx: 2 }} variant="contained" color="error">
                  Back
                </Button>
              </Link>
              <Button
                variant="contained"
                onClick={() => checkOut(product[0].transaction.id)}
              >
                Check Out
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
