import { Grid, Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ToggleDashBoard from "../../components/ToggleDashBoard";
import { io } from "socket.io-client";
import SoilMoistureRange from "../../components/SoilMoistureRange";

const socket = io(process.env.REACT_APP_BASE_URL);

const DashBoard = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [isAutoMode, setIsAutoMode] = useState(false);

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
          <ToggleDashBoard
            isAutoMode={isAutoMode}
            setIsAutoMode={setIsAutoMode}
            title="Fan"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ToggleDashBoard
            isAutoMode={isAutoMode}
            setIsAutoMode={setIsAutoMode}
            title="Pump"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ToggleDashBoard
            isAutoMode={isAutoMode}
            setIsAutoMode={setIsAutoMode}
            title="Auto Mode"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ToggleDashBoard
            isAutoMode={isAutoMode}
            setIsAutoMode={setIsAutoMode}
            title="Led"
          />
        </Grid>
      </Grid>
      <SoilMoistureRange />
    </Box>
  );
};

export default DashBoard;
