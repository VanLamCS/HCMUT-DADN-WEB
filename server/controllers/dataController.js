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
            res.status(200).json({
                ...data,
                feed_key: "temperature",
                message: "successful",
            });
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
            res.status(200).json({
                ...data,
                feed_key: "humidity",
                message: "successful",
            });
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
            res.status(200).json({
                ...data,
                feed_key: "soild-moisture",
                message: "successful",
            });
        })
        .catch((error) => {
            res.status(400);
            next(new Error(error.message));
        });
};

export const lastFan = (req, res, next) => {
    axios
        .get(
            `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds/fan/data/last`,
            {
                headers: {
                    "X-AIO-Key": process.env.ADAFRUIT_KEY,
                },
            }
        )
        .then(({ data }) => {
            res.status(200).json({
                ...data,
                feed_key: "fan",
                message: "successful",
            });
        })
        .catch((error) => {
            res.status(400);
            next(new Error(error.message));
        });
};

export const lastLight = (req, res, next) => {
    axios
        .get(
            `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds/light/data/last`,
            {
                headers: {
                    "X-AIO-Key": process.env.ADAFRUIT_KEY,
                },
            }
        )
        .then(({ data }) => {
            res.status(200).json({
                ...data,
                feed_key: "light",
                message: "successful",
            });
        })
        .catch((error) => {
            res.status(400);
            next(new Error(error.message));
        });
};

export const lastMode = (req, res, next) => {
    axios
        .get(
            `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds/mode/data/last`,
            {
                headers: {
                    "X-AIO-Key": process.env.ADAFRUIT_KEY,
                },
            }
        )
        .then(({ data }) => {
            res.status(200).json({
                ...data,
                feed_key: "mode",
                message: "successful",
            });
        })
        .catch((error) => {
            res.status(400);
            next(new Error(error.message));
        });
};

export const lastPump = (req, res, next) => {
    axios
        .get(
            `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds/pump/data/last`,
            {
                headers: {
                    "X-AIO-Key": process.env.ADAFRUIT_KEY,
                },
            }
        )
        .then(({ data }) => {
            res.status(200).json({
                ...data,
                feed_key: "pump",
                message: "successful",
            });
        })
        .catch((error) => {
            res.status(400);
            next(new Error(error.message));
        });
};

export const setFan = async (req, res, next) => {
    const { value } = req.body;
    if (!value) {
        res.status(400);
        next(new Error("Value is not sent!"));
    } else {
        let temperature = parseFloat(value);
        if (temperature >= 0 && temperature <= 3) {
            const { data } = await axios.post(
                `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds/fan/data`,
                {
                    value: value,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-AIO-Key": process.env.ADAFRUIT_KEY,
                    },
                }
            );
            if (data) {
                res.status(201).json({ ...data, message: "successful" });
            } else {
                res.status(400);
                next(new Error("Set value faild"));
            }
        } else {
            res.status(400);
            next(new Error("Value is invalid"));
        }
    }
};

export const setMode = async (req, res, next) => {
    const { value } = req.body;
    if (!value) {
        res.status(400);
        next(new Error("Value is not sent!"));
    } else {
        let temperature = parseFloat(value);
        if (temperature == 0 || temperature == 1) {
            const { data } = await axios.post(
                `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds/mode/data`,
                {
                    value: value,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-AIO-Key": process.env.ADAFRUIT_KEY,
                    },
                }
            );
            if (data) {
                res.status(201).json({ ...data, message: "successful" });
            } else {
                res.status(400);
                next(new Error("Set value faild"));
            }
        } else {
            res.status(400);
            next(new Error("Value is invalid"));
        }
    }
};

export const setLight = async (req, res, next) => {
    const { value } = req.body;
    if (!value) {
        res.status(400);
        next(new Error("Value is not sent!"));
    } else {
        let temperature = parseFloat(value);
        if (temperature == 0 || temperature == 1) {
            const { data } = await axios.post(
                `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds/light/data`,
                {
                    value: value,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-AIO-Key": process.env.ADAFRUIT_KEY,
                    },
                }
            );
            if (data) {
                res.status(201).json({ ...data, message: "successful" });
            } else {
                res.status(400);
                next(new Error("Set value faild"));
            }
        } else {
            res.status(400);
            next(new Error("Value is invalid"));
        }
    }
};

export const setPump = async (req, res, next) => {
    const { value } = req.body;
    if (!value) {
        res.status(400);
        next(new Error("Value is not sent!"));
    } else {
        let temperature = parseFloat(value);
        if (temperature == 0 || temperature == 1) {
            const { data } = await axios.post(
                `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds/pump/data`,
                {
                    value: value,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-AIO-Key": process.env.ADAFRUIT_KEY,
                    },
                }
            );
            if (data) {
                res.status(201).json({ ...data, message: "successful" });
            } else {
                res.status(400);
                next(new Error("Set value faild"));
            }
        } else {
            res.status(400);
            next(new Error("Value is invalid"));
        }
    }
};
