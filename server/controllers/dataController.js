import axios from "axios";
const reqConfig = {
  headers: {
    "X-AIO-Key": `${process.env.ADAFRUIT_KEY}`,
  },
};
export const lastTemperature = (req, res, next) => {
  axios
    .get(
      `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds/temperature/data/last`,
      reqConfig
    )
    .then((data) => {
      res.status(200).json({ feed: "temperature", data: data.data });
    })
    .catch((error) => {
      next(new Error(error.message));
    });
};

export const lastHumidity = (req, res, next) => {
  axios
    .get(
      `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds/humidity/data/last`,
      reqConfig
    )
    .then((data) => {
      res.status(200).json({ feed: "humidity", data: data.data });
    })
    .catch((error) => {
      next(new Error(error.message));
    });
};

export const lastSoildMoisture = (req, res, next) => {
  axios
    .get(
      `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds/soild-moisture/data/last`,
      reqConfig
    )
    .then((data) => {
      res.status(200).json({ feed: "soild-moisture", data: data.data });
    })
    .catch((error) => {
      next(new Error(error.message));
    });
};
