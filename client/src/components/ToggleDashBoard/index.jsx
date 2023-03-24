import React, { useState } from "react";
import styles from "./style.module.css";
import { Typography, Stack, Box } from "@mui/material";
import ToggleButton from "../ToggleButton";
import CribIcon from "@mui/icons-material/Crib";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import SanitizerIcon from "@mui/icons-material/Sanitizer";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import WbIncandescentIcon from "@mui/icons-material/WbIncandescent";

const ToggleDashBoard = ({ title, isAutoMode, setIsAutoMode }) => {
  const [toggle, setToggle] = useState("");

  let icon = <CribIcon />;
  if (title == "Fan") {
    icon = (
      <ChildFriendlyIcon
        className={styles.icon}
        sx={{ fontSize: 53, color: toggle === "ON" && "#6770fa" }}
      />
    );
  }

  if (title == "Pump") {
    icon = (
      <SanitizerIcon
        sx={{ fontSize: 53, color: toggle === "ON" && "#6770fa" }}
      />
    );
  }

  if (title == "Auto Mode") {
    icon = (
      <ModelTrainingIcon
        sx={{ fontSize: 53, color: toggle === "ON" && "#6770fa" }}
      />
    );
  }

  if (title == "Led") {
    icon = (
      <WbIncandescentIcon
        sx={{ fontSize: 53, color: toggle === "ON" && "#6770fa" }}
      />
    );
  }

  return (
    <Stack className={styles.container}>
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        m="15px 30px 0 30px"
      >
        <ToggleButton isAutoMode={isAutoMode} setIsAutoMode={setIsAutoMode} title={title} toggle={toggle} setToggle={setToggle} />
      </Stack>
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        m="40px 30px 0 30px"
      >
        <Typography
          // width="130px"
          height="30px"
          fontWeight={700}
          fontSize="1.4rem"
          textTransform="uppercase"
        >
          {title}
        </Typography>
        <Box mr="15px">{icon}</Box>
      </Stack>
    </Stack>
  );
};

export default ToggleDashBoard;
