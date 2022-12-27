import React from "react";
import BoxSx from "../assets/Hero";
import BasicCard from "../assets/Card";
import ResponsiveAppBar from "../assets/Navbar";

export default function HalUtama() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <BoxSx />
      <BasicCard />
    </div>
  );
}
