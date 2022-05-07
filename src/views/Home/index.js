import React from "react";
import Result from "./Result";
import Header from "./Header";
import { Container } from "@mui/material";
const index = () => {
  return (
    <Container maxWidth="md">
      <Header />
      <Result />
    </Container>
  );
};

export default index;
