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
import { CircularProgress } from "@mui/material";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const socket = io("http://localhost:8000");

// global.socket = socket

const ToggleButton = ({
  title,
  toggle,
  setToggle,
  isAutoMode,
  setIsAutoMode,
}) => {
  const [isOn, setIsOn] = useState(false);
  const [disable, setDisable] = useState(false);
  const initialStateFan = useSelector(state => state.deviceStatus.fanStatus)
  const initialStatePump = useSelector(state => state.deviceStatus.pumpStatus)
  const initialStateLed = useSelector(state => state.deviceStatus.ledStatus)
  const initialStateMode = useSelector(state => state.deviceStatus.modeStatus)

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
      if (isAutoMode) {
        setToggle("OFF");
        const postData = { value: "0" };
        await setPump(postData);
      } else {
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
        setIsAutoMode(false);
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

  const changeAutoMode = async () => {
    if (toggle === "") {
      setDisable(true);
    }
    if (!isAutoMode) {
      setDisable(false);
    }
    if (isAutoMode && title === "Fan") {
      setDisable(true);
    } else if (isAutoMode && title === "Pump") {
      setDisable(true);
    }

    // if (title === "Fan" && isAutoMode) {
    //   setToggle("OFF");
    //   setIsOn(false)
    //   const postData = { value: "0" };
    //   await setFan(postData);
    // }
    // if (title === "Pump" && isAutoMode) {
    //   setIsOn(false)
    //   setToggle("OFF");
    //   const postData = { value: "0" };
    //   await setPump(postData);
    // }
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
        // const value = initialStateFan;
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
        // const value = initialStatePump;
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
      // const value = initialStateMode;
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
  }, [initialStateFan, initialStatePump, initialStateMode, initialStateLed]);

  useEffect(() => {
    changeAutoMode();
  }, [isAutoMode]);

  return (
    <>
      <Typography
        sx={{ transition: "all 0.6s ease-in" }}
        color={toggle === "ON" && "#6770fa"}
        width="30px"
        mr="20px"
        fontWeight={700}
        fontSize="2.2rem"
        textTransform="uppercase"
      >
        {toggle === "" ? <CircularProgress sx={{ color: "#fff" }} /> : toggle}
      </Typography>
      <div className={styles.containerButton}>
        <label className={styles.switch}>
          <input
            checked={isOn}
            value={isOn}
            type="checkbox"
            onChange={handleToggle}
            disabled={disable}
          />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
      </div>
    </>
  );
};

export default ToggleButton;
