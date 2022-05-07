import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLaunches, launchesSelector } from "../../slices/launches";
import { Grid, TablePagination, TextField, Typography } from "@mui/material";
import FilterOptions from "../../components/FilterOptions";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import SearchIcon from "@mui/icons-material/Search";

const applyPagination = (launches, page, limit) => {
  return launches.slice(page * limit, page * limit + limit);
};

const searchLaunches = (launches, query) => {
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

const applyFilters = (launches, filter) => {
  return launches.filter((launch) => {
    const today = new Date(); // 2020
    const lastYear = today.getFullYear() - 1;
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    switch (filter) {
      case "Last year":
        return +launch.launch_year === lastYear;
      case "Last month":
        return new Date(launch.launch_date_utc) === lastMonth;
      case "Last week":
        return new Date(launch.launch_date_utc) === lastWeek;
      case "Success":
        return launch.launch_success;
      case "Failure":
        return !launch.launch_success;
      case "Is it upcoming":
        return launch.upcoming;
      default:
        return true;
    }
  });
};

const Result = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(9);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(null);

  const dispatch = useDispatch();

  const { launches, loading, hasErrors } = useSelector(launchesSelector);

  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch]);

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

  const handleFilter = (e, val) => {
    if (val) {
      setFilter(val?.value);
    } else {
      setFilter(null);
    }
  };

  const filteredLaunches = applyFilters(launches, filter);

  const searchedLaunches = searchLaunches(filteredLaunches, query);

  const paginatedLaunches = applyPagination(searchedLaunches, page, limit);

  if (loading) {
    return <Loader />;
  }

  if (hasErrors) {
    return (
      <Typography component="h4" variant="h4">
        Somethig went wrong
      </Typography>
    );
  }

  return (
    <div>
      <Grid container mt={5} justifyContent="space-between">
        <Grid item>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <SearchIcon color="red" />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="standard-basic"
                label="Search by rocket name"
                variant="standard"
                onChange={handleQueryChange}
                value={query}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <FilterOptions handleFilter={handleFilter} />
        </Grid>
      </Grid>
      {paginatedLaunches && paginatedLaunches.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {paginatedLaunches.map((launch, index) => {
              return (
                <Grid key={index} mt={5} item xs={12} sm={6} md={4}>
                  <Card launch={launch} />
                </Grid>
              );
            })}
          </Grid>
          <TablePagination
            component="div"
            count={launches.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            labelRowsPerPage="Rows Per Page"
            rowsPerPageOptions={[3, 6, 9, 12]}
          />
        </>
      ) : (
        <Typography mt={5} variant="h4" component="h4">
          No result found
        </Typography>
      )}
    </div>
  );
};

export default Result;
