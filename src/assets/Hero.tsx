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
      }}
    >
      <Card
        sx={{
          width: "100%",
          position: "absolute",
          borderTopLeftRadius: 1,
          borderTopRightRadius: 1,
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
