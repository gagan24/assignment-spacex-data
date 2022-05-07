import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLaunches, launchesSelector } from "../../slices/launches";
import Result from "./Result";
import Header from "./Header";
import { Container } from "@mui/material";

const Index = () => {
  const dispatch = useDispatch();

  const { launches, loading, hasErrors } = useSelector(launchesSelector);
  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch]);
  return (
    <Container maxWidth="md">
      <Header />
      <Result launches={launches} loading={loading} hasErrors={hasErrors} />
    </Container>
  );
};

export default Index;
