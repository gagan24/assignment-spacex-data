import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLaunches, launchesSelector } from "../../slices/launches";
import { Container, Grid, TablePagination, TextField } from "@mui/material";
import Result from "./Result";

const applyPagination = (launches, page, limit) => {
  return launches.slice(page * limit, page * limit + limit);
};

const applyFilters = (launches, query) => {
  return launches.filter((launch) => {
    let matches = true;

    if (query) {
      let containsQuery = false;

      if (
        launch.rocket.rocket_name.toLowerCase().includes(query.toLowerCase())
      ) {
        containsQuery = true;
      }

      if (!containsQuery) {
        matches = false;
      }
    }

    return matches;
  });
};

const Home = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(9);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const { launches, loading, hasErrors } = useSelector(launchesSelector);

  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch]);

  console.log("launches: ", launches);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const filteredLaunches = applyFilters(launches, query);

  const paginatedLaunches = applyPagination(filteredLaunches, page, limit);

  if (loading) {
    return (
      <Container>
        <h2>Loading...</h2>
      </Container>
    );
  }

  if (hasErrors) {
    return (
      <Container>
        <h2>Somethig went wrong</h2>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item>
          <TextField
            id="standard-basic"
            label="Search by rocket name"
            variant="standard"
            onChange={handleQueryChange}
            value={query}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {paginatedLaunches.map((launch, index) => {
          return (
            <Grid key={index} mt={5} item xs={4} sm={4} md={4}>
              <Result launch={launch} />
            </Grid>
          );
        })}
      </Grid>
      <TablePagination
        component="div"
        count={launches.length}
        onPageChange={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Container>
  );
};

export default Home;
