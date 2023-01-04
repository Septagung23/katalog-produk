import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../constant/constant";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Button,
} from "@mui/material";
import axios from "axios";

export default function Payment() {
  const [transaction, setTransaction] = useState<any[]>([]);
  const token = window.localStorage.getItem("jwt");
  console.log(token);

  useEffect(() => {
    getTransaction();
  }, []);

  console.log(transaction);

  const getTransaction = async () => {
    try {
      const res = await axios.get(`${api}/transaction`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransaction(res.data);
      console.log(transaction);
    } catch (error) {
      console.log(error);
    }
  };

  const unpaid = async (transactionId: string) => {
    try {
      await axios.post(`${api}/transaction/unpaid/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getTransaction();
    } catch (error) {
      console.log(error);
    }
  };

  const paid = async (transactionId: string) => {
    try {
      const jwt = await window.localStorage.getItem("jwt");
      await axios.post(`${api}/transaction/paid/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      getTransaction();
    } catch (error) {
      console.log(error);
    }
  };

  const waiting = async (transactionId: string) => {
    try {
      await axios.post(`${api}/transaction/waiting/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getTransaction();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          backgroundColor: "#caf0f8",
        }}
      >
        <Typography sx={{ alignSelf: "center" }} variant="h1">
          Transaction
        </Typography>

        <Box
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
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="outlined" color="error" sx={{ m: 2 }}>
              Back
            </Button>
          </Link>
          <TableContainer sx={{ mb: 4 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Transaction ID</TableCell>
                  <TableCell align="center">User</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transaction.map((t) => {
                  return (
                    <TableRow key={t.id}>
                      <TableCell align="center">{t.id}</TableCell>
                      <TableCell align="center">{t.user.username}</TableCell>
                      <TableCell align="center">{t.status}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => unpaid(t.id)}
                        >
                          Unpaid
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ mx: 1 }}
                          onClick={() => waiting(t.id)}
                        >
                          Waiting
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "#70e000" }}
                          onClick={() => paid(t.id)}
                        >
                          Paid
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
