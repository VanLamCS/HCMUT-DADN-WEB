import { Slider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  getHightSolidMoisture,
  getLowSolidMoisture,
  postRangeSolidMoisture,
} from "../../api";
import { styled, alpha, Box } from "@mui/system";
import { sliderClasses } from "@mui/base/Slider";
import styles from "./styles.module.css";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  300: "#66B2FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledSlider = styled(Slider)(
  ({ theme }) => `
    color: ${theme.palette.mode === "light" ? blue[500] : blue[300]};
    height: 6px;
    width: 100%;
    padding: 6px 0;
    display: inline-block;
    position: relative;
    cursor: pointer;
    touch-action: none;
    -webkit-tap-highlight-color: transparent;
  
    &:hover {
      opacity: 1;
    }
  
    &.${sliderClasses.disabled} { 
      pointer-events: none;
      cursor: default;
      color: ${theme.palette.mode === "light" ? grey[300] : grey[600]};
      opacity: 0.5;
    }
  
    & .${sliderClasses.rail} {
      display: block;
      position: absolute;
      width: 100%;
      height: 10px;
      border-radius: 2px;
      background-color: currentColor;
      opacity: 0.4;
    }
  
    & .${sliderClasses.track} {
      display: block;
      position: absolute;
      height: 4px;
      border-radius: 2px;
      background-color: currentColor;
    }
  
    & .${sliderClasses.thumb} {
      position: absolute;
      width: 26px;
      height: 26px;
      box-sizing: border-box;
      border-radius: 50%;
      outline: 0;
      border: 3px solid currentColor;
      background-color: #fff;
  
      :hover,
      &.${sliderClasses.focusVisible} {
        box-shadow: 0 0 0 0.25rem ${alpha(
          theme.palette.mode === "light" ? blue[400] : blue[300],
          0.15
        )};
      }

      & .label {
        background: unset;
        background-color: ${
          theme.palette.mode === "light" ? blue[500] : blue[300]
        };
        width: 32px;
        height: 32px;
        padding: 0px;
        visibility: hidden;
        color: #fff;
        border-radius: 50% 50% 50% 0;
        position: absolute;
        transform: translate(-35%, -140%) rotate(-45deg) scale(0);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }
  
      &.${sliderClasses.active} {
        box-shadow: 0 0 0 0.25rem ${alpha(
          theme.palette.mode === "light" ? blue[200] : blue[300],
          0.3
        )};
      }
    }
  
    & .${sliderClasses.mark} {
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 2px;
      background-color: currentColor;
      top: 50%;
      opacity: 0.7;
      transform: translateX(-50%);
    }
  
    & .${sliderClasses.markActive} {
      background-color: #fff;
    }
  `
);

const SoilMoistureRange = () => {
  const [range, setRange] = useState({ high: 0, low: 0 });

  useEffect(() => {
    // Fetch the initial state of high-soild-moisture and low-soild-moisture
    const fetchData = async () => {
      const high = await getHightSolidMoisture();
      const low = await getLowSolidMoisture();
      setRange({ high: high.data.value, low: low.data.value });
    };
    fetchData();
  }, []);

  const handleChange = async (event, newValue) => {
    console.log("check newValue: ", newValue);
    setRange({ ...range, high: newValue[1], low: newValue[0] });
    const data = { high: newValue[1], low: newValue[0] };
    const res = await postRangeSolidMoisture(data);
  };

  function SliderValueLabel({ children }) {
    return (
      <span className="label">
        <div className="value">{children}</div>
      </span>
    );
  }

  const marks = [
    {
      value: range.low,
      label: `${range.low}%`,
    },
    {
      value: range.high,
      label: `${range.high}%`,
    },
  ];

  return (
    <div>
      <Stack className={styles.container}>
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          m="15px 30px 0 30px"
        >
          <StyledSlider
            value={[range.low, range.high]}
            min={0}
            max={100}
            onChange={handleChange}
            // slots={{ valueLabel: SliderValueLabel }}
            marks={marks}
            step={1}
          />
        </Stack>
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          m="40px 30px 0 30px"
        >
          <Typography
            height="30px"
            fontWeight={700}
            fontSize="1.4rem"
            textTransform="uppercase"
          >
            Soil Moisture Range
          </Typography>
          <Box mr="15px">
            <WaterDropIcon className={styles.icon} sx={{ fontSize: 53 }} />
          </Box>
        </Stack>
      </Stack>
    </div>
  );
};

export default SoilMoistureRange;
