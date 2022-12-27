import * as React from "react";
import { Box } from "@mui/system";

export default function BoxSx() {
  return (
    <Box
      sx={{
        width: "100%",
        height: 500,
        background:
          "linear-gradient(50deg, rgba(15,9,106,1) 0%, rgba(7,7,111,1) 14%, rgba(20,20,134,1) 31%, rgba(13,13,156,1) 53%, rgba(0,212,255,1) 100%);",
      }}
    ></Box>
  );
}
