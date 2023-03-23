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
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

const ToggleButton = ({
  title,
  toggle,
  setToggle,
  isAutoMode,
  setIsAutoMode,
}) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = async (e) => {
    setIsOn((toggle) => !toggle);

    if (title === "Fan") {
      if (isAutoMode) {
        setToggle("OFF");
        const postData = { value: "0" };
        await setFan(postData);
      } else {
        if (toggle === "OFF") {
          setToggle("ON");
          const postData = { value: "1" };
          await setFan(postData);
        } else {
          setToggle("OFF");
          const postData = { value: "0" };
          await setFan(postData);
        }
      }
    }
    if (title === "Pump") {
      if(isAutoMode) {
        setToggle("OFF");
        const postData = { value: "0" };
        await setPump(postData);
      }
      else {
        if (toggle === "OFF") {
          setToggle("ON");
          const postData = { value: "1" };
          await setPump(postData);
        } else {
          setToggle("OFF");
          const postData = { value: "0" };
          await setPump(postData);
        }
      }
    }

    if (title === "Auto Mode") {
      if (toggle === "OFF") {
        setIsAutoMode(true);
        setToggle("ON");
        const postData = { value: "1" };
        await setMode(postData);
      } else {
        setToggle("OFF");
        const postData = { value: "0" };
        await setMode(postData);
      }
    }

    if (title === "Led") {
      if (toggle === "OFF") {
        setToggle("ON");
        const postData = { value: "1" };
        await setLight(postData);
      } else {
        setToggle("OFF");
        const postData = { value: "0" };
        await setLight(postData);
      }
    }
  };

  const getInitialDevice = async () => {
    if (title === "Fan") {
      socket.on("fanUpdate", ({ fan }) => {
        if (fan == 1) {
          setToggle("ON");
          setIsOn(true);
        } else {
          setToggle("OFF");
          setIsOn(false);
        }
      });
      const { data } = await getFan();
      if (isAutoMode) {
        setToggle("OFF");
        setIsOn(false);
      } else {
        const value = data.value;
        if (value === "0") {
          setToggle("OFF");
          setIsOn(false);
        } else if (value === "1") {
          setToggle("ON");
          setIsOn(true);
        }
      }
    }

    if (title === "Pump") {
      socket.on("pumpUpdate", ({ pump }) => {
        if (pump == 1) {
          setToggle("ON");
          setIsOn(true);
        } else {
          setToggle("OFF");
          setIsOn(false);
        }
      });
      const { data } = await getPump();
      if (isAutoMode) {
        setToggle("OFF");
        setIsOn(false);
      } else {
        const value = data.value;
        if (value === "0") {
          setToggle("OFF");
          setIsOn(false);
        } else if (value === "1") {
          setToggle("ON");
          setIsOn(true);
        }
      }
    }

    if (title === "Auto Mode") {
      socket.on("modeUpdate", ({ mode }) => {
        if (mode == 1) {
          setToggle("ON");
          setIsOn(true);
        } else {
          setToggle("OFF");
          setIsOn(false);
        }
      });
      const { data } = await getMode();
      const value = data.value;
      if (value === "0") {
        setToggle("OFF");
        setIsOn(false);
      } else if (value === "1") {
        setIsAutoMode(true);
        setToggle("ON");
        setIsOn(true);
      }
    }

    if (title === "Led") {
      socket.on("lightUpdate", ({ light }) => {
        if (light == 1) {
          setToggle("ON");
          setIsOn(true);
        } else {
          setToggle("OFF");
          setIsOn(false);
        }
      });
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
            disabled={toggle === "" || (isAutoMode == true && title !== "Auto Mode")}
          />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
      </div>
    </>
  );
};

export default ToggleButton;
