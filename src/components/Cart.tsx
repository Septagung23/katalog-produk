import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { api } from "../constant/constant";
import ResponsiveAppBar from "../assets/Navbar";
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
  Checkbox,
} from "@mui/material";
import Button from "@mui/material/Button";

export default function Cart() {
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
          backgroundColor: "#dddddd",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            backgroundColor: "#dddddd",
          }}
        >
          <Box
            sx={{
              width: "60%",
              height: "auto",
              borderRadius: 2,
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
                    <TableCell />
                    <TableCell>Product</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {product.map((p) => (
                    <TableRow
                      key={p.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <Checkbox
                        color="primary"
                        inputProps={{
                          "aria-label": "select all desserts",
                        }}
                      />
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
              borderRadius: 2,
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
                display: "flex",
                justifyContent: "space-between",
                mx: 2,
                my: 4,
              }}
            >
              <Typography variant="overline">Subtotal</Typography>
              <Typography variant="overline">""</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mx: 2,
                mb: 4,
              }}
            >
              <Typography variant="overline">Shipping</Typography>
              <Typography variant="overline">""</Typography>
            </Box>
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
              <Typography variant="overline">""</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button sx={{ mx: 2 }} variant="contained" color="error">
                  Back
                </Button>
              </Link>
              <Button variant="contained">Check Out</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
