import { Grid, Box, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import ToggleDashBoard from "../../components/ToggleDashBoard";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000"); 

const DashBoard = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        display="flex"
        flexDirection={isMobile && "column"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title="DASHBOARD" subtitle="You can adjust your device here" />
      </Box>
      <Grid container>
        <Grid item xs={12} md={6}>
          <ToggleDashBoard title="Fan" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ToggleDashBoard title="Pump" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ToggleDashBoard title="Auto Mode" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ToggleDashBoard title="Led" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashBoard;
