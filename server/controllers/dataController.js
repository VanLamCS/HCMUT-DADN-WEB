import axios from "axios";

export const lastTemperature = (req, res, next) => {
  axios
    .get(
      `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds/temperature/data/last`,
      {
        headers: {
          "X-AIO-Key": process.env.ADAFRUIT_KEY,
        },
      }
    )
    .then(({ data }) => {
      res.status(200).json({ feed: "temperature", data: data });
    })
    .catch((error) => {
      res.status(400);
      next(new Error(error.message));
    });
};

export const lastHumidity = (req, res, next) => {
  axios
    .get(
      `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds/humidity/data/last`,
      {
        headers: {
          "X-AIO-Key": process.env.ADAFRUIT_KEY,
        },
      }
    )
    .then(({ data }) => {
      res.status(200).json({ feed: "humidity", data: data });
    })
    .catch((error) => {
      res.status(400);
      next(new Error(error.message));
    });
};

export const lastSoildMoisture = (req, res, next) => {
  axios
    .get(
      `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds/soild-moisture/data/last`,
      {
        headers: {
          "X-AIO-Key": process.env.ADAFRUIT_KEY,
        },
      }
    )
    .then(({ data }) => {
      res.status(200).json({ feed: "soild-moisture", data: data });
    })
    .catch((error) => {
      res.status(400);
      next(new Error(error.message));
    });
};
