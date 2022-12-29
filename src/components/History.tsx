import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../constant/constant";
import ResponsiveAppBar from "../assets/Navbar";
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
          backgroundColor: "#dddddd",
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
                  <TableCell>No</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {product.map((p) => (
                  <TableRow
                    key={p.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>1</TableCell>
                    <TableCell component="th" scope="row">
                      {p.name}
                    </TableCell>
                    <TableCell align="center">{p.stock}</TableCell>
                    <TableCell align="center">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(p.price)}
                    </TableCell>
                    <TableCell align="center">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(p.price * p.stock)}
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
