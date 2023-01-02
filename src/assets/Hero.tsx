import * as React from "react";
import { Box, Card, CardMedia, Paper, Typography } from "@mui/material";
import gambs1 from "./img/hero1.jpg";

export default function BoxSx() {
  const font = "'Sevillana', cursive";
  return (
    <Paper
      sx={{
        width: "100%",
        height: 500,
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
        boxShadow: 5,
        // backgroundImage: { gambs1 },
        background:
          "linear-gradient(50deg, rgba(15,9,106,1) 0%, rgba(7,7,111,1) 14%, rgba(20,20,134,1) 31%, rgba(13,13,156,1) 53%, rgba(0,212,255,1) 100%);",
      }}
    >
      <Card
        sx={{
          width: "100%",
          position: "absolute",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      >
        <Typography
          fontFamily={font}
          variant="h1"
          sx={{
            position: "absolute",
            top: "40%",
            left: "17%",
            color: "white",
          }}
        >
          Think globally, Buy locally
        </Typography>
        <CardMedia
          sx={{
            zIndex: -1,
            height: 500,
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
          image={gambs1}
        />
      </Card>
    </Paper>
  );
}
