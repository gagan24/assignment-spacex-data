import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

export default function BasicCard({ launch }) {
  return (
    <Card sx={{}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Flight No.: {launch.flight_number}
        </Typography>
        <Tooltip title={launch.mission_name} arrow>
          <Typography variant="h5" component="div">
            {launch.mission_name.length < 14
              ? launch.mission_name
              : `${launch.mission_name.substring(0, 14)}...`}
          </Typography>
        </Tooltip>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Rocket: {launch.rocket.rocket_name}
        </Typography>
        <Typography variant="body2">
          Launch Year: {launch.launch_year}
        </Typography>
      </CardContent>
      <CardActions>
        <a
          href={launch.links.article_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outlined" size="small">
            Read More
          </Button>
        </a>
      </CardActions>
    </Card>
  );
}
