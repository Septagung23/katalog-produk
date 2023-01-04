import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../constant/constant";
import { useUserId } from "./PrivateRoutes";
import ResponsiveAppBar from "../assets/Navbar";
import axios from "axios";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
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
  const [transaction, setTransaction] = useState<any>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionItems, setTransactionItems] = useState<[]>([]);
  const { userId } = useUserId();
  const navigate = useNavigate();
  const token = window.localStorage.getItem("jwt");

  let sub = transactionItems.map((ti: any) => {
    return (
      <div key={ti.id}>
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(ti.subtotal)}
      </div>
    );
  });

  useEffect(() => {
    getTransaction();
  }, [userId]);

  const getTransaction = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${api}/transaction/item/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransaction(res.data);
      setTransactionItems(res.data.transaction_items);
      console.log(res.data);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const increaseAmount = async (id: string, amount: string) => {
    try {
      await axios.patch(
        `${api}/transaction/item-increase/${id}`,
        {
          amount: parseInt(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getTransaction();
    } catch (error: any) {
      console.log(error);
    }
  };

  const decreaseAmount = async (id: string, amount: string) => {
    try {
      await axios.patch(
        `${api}/transaction/item-decrease/${id}`,
        {
          amount: parseInt(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getTransaction();
    } catch (error: any) {
      console.log(error);
    }
  };

  const deleteProduct = async (id: any) => {
    try {
      await axios.delete(`${api}/transaction/item/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getTransaction();
    } catch (error: any) {
      console.log(error);
    }
  };

  const checkOut = async (transactionId: string) => {
    try {
      await axios.patch(
        `${api}/transaction/checkout/${transactionId}`,
        { transactionItems: JSON.stringify(transactionItems) },
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

  if (isLoading) {
    return (
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1>Wait a Sec ...</h1>
      </Box>
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
                  {transactionItems.map((item: any) => {
                    return (
                      <TableRow
                        key={item.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {item.product.name}
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
                              onClick={() =>
                                decreaseAmount(item.id, item.amount)
                              }
                            >
                              <RemoveCircleRoundedIcon color="error" />
                            </Button>
                            <Box>{item.amount}</Box>
                            <Button
                              onClick={() =>
                                increaseAmount(item.id, item.amount)
                              }
                            >
                              <AddCircleRoundedIcon />
                            </Button>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(item.product.price)}
                        </TableCell>
                        <TableCell align="center">
                          {transaction.status}
                        </TableCell>
                        <TableCell align="center">
                          <Button onClick={() => deleteProduct(item.id)}>
                            <DeleteRoundedIcon color="error" fontSize="large" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box
            sx={{
              width: "40%",
              backgroundColor: "lightgoldenrodyellow",
              borderTopLeftRadius: "16px",
              borderBottomRightRadius: "16px",
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
              <Typography variant="subtitle2">Total</Typography>
              <Typography variant="subtitle2">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(transaction ? transaction.total : 0)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button sx={{ mx: 2 }} variant="contained" color="error">
                  Back
                </Button>
              </Link>
              <Button
                variant="contained"
                onClick={() => checkOut(transaction.id)}
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
