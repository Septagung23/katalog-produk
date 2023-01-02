import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../constant/constant";
import axios from "axios";
import ResponsiveAppBar from "../assets/Navbar";
import { useUserId } from "./PrivateRoutes";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

export default function History() {
  const [product, setProduct] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userId } = useUserId();
  const navigate = useNavigate();

  // useEffect(() => {
  //   getTransaction();
  // }, [userId]);

  // // const getTransaction = async () => {
  // //   setIsLoading(true);
  // //   try {
  // //     const token = window.localStorage.getItem("jwt");
  // //     const res = await axios.get(`${api}/transaction/item/${userId}`, {
  // //       headers: {
  // //         Authorization: `Bearer ${token}`,
  // //       },
  // //     });
  // //     // const res = await axios.get(`${api}/product`);
  // //     setProduct(res.data);
  // //     console.log(res);
  // //     setIsLoading(false);
  // //   } catch (error: any) {
  // //     console.log(error);
  // //     setIsLoading(false);
  // //   }
  // // };

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

  product.map((p) => {
    console.log("Data : ", p);
  });

  return (
    <>
      <ResponsiveAppBar admin={isAdmin} />
      <Box
        sx={{
          width: "100%",
          height: 1,
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#caf0f8",
        }}
      >
        <Typography sx={{ alignSelf: "center" }} variant="h1">
          Transaction History
        </Typography>
        <Box
          sx={{
            width: "auto",
            display: "flex",
            justifyContent: "center",
            m: 4,
            borderRadius: 8,
            backgroundColor: "white",
          }}
        >
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {product.map((p) => (
                  <TableRow
                    key={p.product.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {p.product.name}
                    </TableCell>
                    <TableCell align="center">{p.amount}</TableCell>
                    <TableCell align="center">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(p.product.price)}
                    </TableCell>
                    <TableCell align="center">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(p.product.price * p.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
