import React, { useEffect, useState } from "react";
import { Typography, Stack } from "@mui/material";
import styles from "./style.module.css";
import {
  getFan,
  getLed,
  getMode,
  getPump,
  setFan,
  setLight,
  setMode,
  setPump,
} from "../../api";
// import CircularProgress from '@mui/joy/CircularProgress';
import { CircularProgress } from "@mui/material";

const ToggleButton = ({ title, toggle, setToggle }) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = async (e) => {
    setIsOn((toggle) => !toggle);

    if (title === "Fan") {
      if (toggle === "OFF") {
        setToggle("ON");
        const postData = { value: "1" };
        const { data } = await setFan(postData);
      } else {
        setToggle("OFF");
        const postData = { value: "0" };
        const { data } = await setFan(postData);
      }
    }
    if (title === "Pump") {
      if (toggle === "OFF") {
        setToggle("ON");
        const postData = { value: "1" };
        const { data } = await setPump(postData);
      } else {
        setToggle("OFF");
        const postData = { value: "0" };
        const { data } = await setPump(postData);
      }
    }

    if (title === "Auto Mode") {
      if (toggle === "OFF") {
        setToggle("ON");
        const postData = { value: "1" };
        const { data } = await setMode(postData);
      } else {
        setToggle("OFF");
        const postData = { value: "0" };
        const { data } = await setMode(postData);
      }
    }

    if (title === "Led") {
      if (toggle === "OFF") {
        setToggle("ON");
        const postData = { value: "1" };
        const { data } = await setLight(postData);
      } else {
        setToggle("OFF");
        const postData = { value: "0" };
        const { data } = await setLight(postData);
      }
    }
  };

  const getInitialDevice = async () => {
    console.log("I am here")
    if (title === "Fan") {
      const { data } = await getFan();
      console.log("check fan: ", data)
      const value = data.value;
      if (value === "0") {
        setToggle("OFF");
        setIsOn(false);
      } else if (value === "1") {
        setToggle("ON");
        setIsOn(true);
      }
    }

    if (title === "Pump") {
      const { data } = await getPump();
      const value = data.value;
      if (value === "0") {
        setToggle("OFF");
        setIsOn(false);
      } else if (value === "1") {
        setToggle("ON");
        setIsOn(true);
      }
    }

    if (title === "Auto Mode") {
      const { data } = await getMode();
      const value = data.value;
      if (value === "0") {
        setToggle("OFF");
        setIsOn(false);
      } else if (value === "1") {
        setToggle("ON");
        setIsOn(true);
      }
    }

    if (title === "Led") {
      const { data } = await getLed();
      const value = data.value;
      if (value === "0") {
        setToggle("OFF");
        setIsOn(false);
      } else if (value === "1") {
        setToggle("ON");
        setIsOn(true);
      }
    }
  };

  useEffect(() => {
    getInitialDevice();
  }, []);

  return (
    <>
      <Typography
        sx={{ transition: "all 0.6s ease-in" }}
        color={toggle === "ON" && "#6770fa"}
        width="30px"
        mr="20px"
        fontWeight={700}
        fontSize={22}
        textTransform="uppercase"
      >
        {toggle === "" ? <CircularProgress sx={{ color: "#fff" }} /> : toggle}
      </Typography>
      <div>
        <label className={styles.switch}>
          <input
            checked={isOn}
            value={isOn}
            type="checkbox"
            onChange={handleToggle}
            disabled={toggle === ""}
          />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
      </div>
    </>
  );
};

export default ToggleButton;
