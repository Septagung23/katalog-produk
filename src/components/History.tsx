import { useEffect, useState } from "react";
import { api } from "../constant/constant";
import { useUserId } from "./PrivateRoutes";
import axios from "axios";
import ResponsiveAppBar from "../assets/Navbar";
import dayjs from "dayjs";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Divider,
} from "@mui/material";

export default function History() {
  const [transaction, setTransaction] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userId } = useUserId();

  useEffect(() => {
    getTransaction();
  }, [userId]);

  const getTransaction = async () => {
    setIsLoading(true);
    try {
      const token = window.localStorage.getItem("jwt");
      const res = await axios.get(`${api}/transaction/history/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransaction(res.data);
      console.log(res.data);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (isLoading === true) {
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
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#caf0f8",
        }}
      >
        <Typography sx={{ alignSelf: "center" }} variant="h1">
          Transaction History
        </Typography>
        {transaction.map((p) => (
          <Box
            key={p.id}
            sx={{
              width: "auto",
              display: "block",
              justifyContent: "center",
              mx: 4,
              my: 2,
              borderRadius: 8,
              backgroundColor: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                px: 2,
                py: 2,
              }}
            >
              <Typography variant="h5">
                Date: {dayjs(p.created_at).format("DD-MMM-YYYY")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: p.status === "Paid" ? "#9ef01a" : "#e5383b",
                  color: p.status === "Paid" ? "#000000" : "#ffffff",
                  borderRadius: "10px",
                }}
              >
                <Typography
                  sx={{
                    p: 1,
                  }}
                >
                  {p.status}
                </Typography>
                <Divider orientation="vertical" />
                <Typography
                  sx={{
                    p: 1,
                  }}
                >
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(p.total)}
                </Typography>
              </Box>
            </Box>
            <TableContainer sx={{ mb: 4 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {p.transaction_items.map((ti: any) => {
                    return (
                      <TableRow
                        key={ti.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {ti.product.name}
                        </TableCell>
                        <TableCell align="center">{ti.amount}</TableCell>
                        <TableCell align="center">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(ti.product.price)}
                        </TableCell>
                        <TableCell align="center">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(ti.subtotal)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}
      </Box>
    </>
  );
}
