import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function FilterOptions({ handleFilter }) {
  return (
    <Autocomplete
      id="grouped-demo"
      options={filterOptions}
      groupBy={(option) => option.heading}
      getOptionLabel={(option) => option.value}
      sx={{ width: 200 }}
      onChange={handleFilter}
      renderInput={(params) => (
        <TextField {...params} label="Sort Options" variant="standard" />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const filterOptions = [
  { heading: "Launch Date", value: "Last week" },
  { heading: "Launch Date", value: "Last month" },
  { heading: "Launch Date", value: "Last year" },
  { heading: "Launch Status", value: "Success" },
  { heading: "Launch Status", value: "Failure" },
  { heading: "Others", value: "Is it upcoming" },
];
