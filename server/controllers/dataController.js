import axios from "axios";
import Notification from "../models/notificationModel.js";

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
            return next(new Error(error.message));
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
            return next(new Error(error.message));
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
            return next(new Error(error.message));
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
            return next(new Error(error.message));
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
            return next(new Error(error.message));
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
            return next(new Error(error.message));
        });
};

export const setFan = async (req, res, next) => {
    const { value } = req.body;
    if (!value) {
        res.status(400);
        return next(new Error("Value is not sent!"));
    } else {
        let temperature = parseFloat(value);
        if (temperature >= 0 && temperature <= 1) {
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
                return next(new Error("Set value failed"));
            }
        } else {
            res.status(400);
            return next(new Error("Value is invalid"));
        }
    }
};

export const setMode = async (req, res, next) => {
    const { value } = req.body;
    if (!value) {
        res.status(400);
        return next(new Error("Value is not sent!"));
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
                return next(new Error("Set value failed"));
            }
        } else {
            res.status(400);
            return next(new Error("Value is invalid"));
        }
    }
};

export const setLight = async (req, res, next) => {
    const { value } = req.body;
    if (!value) {
        res.status(400);
        return next(new Error("Value is not sent!"));
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
                return next(new Error("Set value failed"));
            }
        } else {
            res.status(400);
            return next(new Error("Value is invalid"));
        }
    }
};

export const setPump = async (req, res, next) => {
    const { value } = req.body;
    if (!value) {
        res.status(400);
        return next(new Error("Value is not sent!"));
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
                return next(new Error("Set value failed"));
            }
        } else {
            res.status(400);
            return next(new Error("Value is invalid"));
        }
    }
};

export const getNotifications = async (req, res, next) => {
    let limit = req.query["limit"] ? req.query["limit"] : 24;
    const data = Notification.find({}, "feed content createdAt")
        .sort({ createdAt: "desc" })
        .limit(limit)
        .then((data) => {
            res.status(200).json({ message: "successful", data });
        })
        .catch((e) => {
            res.status(500).json({ message: "failed", error: `Error : ${e}` });
        });
};

export const getTemperatures = async (req, res, next) => {
    let startTime = req.query["start_time"];
    let endTime = req.query["end_time"];
    let hours = req.query["hours"] ? req.query["hours"] : 1;
    let params;
    if (startTime && endTime) {
        params = {
            start_time: startTime,
            end_time: endTime,
        };
    } else {
        params = {
            hours: hours,
        };
    }
    if (hours < 1) {
        hours = 1;
    }
    await axios
        .get(
            `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds/temperature/data/chart`,
            {
                params: params,
                headers: {
                    "X-AIO-Key": process.env.ADAFRUIT_KEY,
                },
            }
        )
        .then(({ data }) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(400);
            return next(new Error(error.message));
        });
};

export const getHumidities = async (req, res, next) => {
    let startTime = req.query["start_time"];
    let endTime = req.query["end_time"];
    let hours = req.query["hours"] ? req.query["hours"] : 1;
    let params;
    if (startTime && endTime) {
        params = {
            start_time: startTime,
            end_time: endTime,
        };
    } else {
        params = {
            hours: hours,
        };
    }
    if (hours < 1) {
        hours = 1;
    }
    await axios
        .get(
            `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds/humidity/data/chart`,
            {
                params: params,
                headers: {
                    "X-AIO-Key": process.env.ADAFRUIT_KEY,
                },
            }
        )
        .then(({ data }) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(400);
            return next(new Error(error.message));
        });
};

export const getSoildMoistures = async (req, res, next) => {
    let startTime = req.query["start_time"];
    let endTime = req.query["end_time"];
    let hours = req.query["hours"] ? req.query["hours"] : 1;
    let params;
    if (startTime && endTime) {
        params = {
            start_time: startTime,
            end_time: endTime,
        };
    } else {
        params = {
            hours: hours,
        };
    }
    if (hours < 1) {
        hours = 1;
    }
    await axios
        .get(
            `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds/soild-moisture/data/chart`,
            {
                params: params,
                headers: {
                    "X-AIO-Key": process.env.ADAFRUIT_KEY,
                },
            }
        )
        .then(({ data }) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(400);
            return next(new Error(error.message));
        });
};

function isIsoDate(str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    const d = new Date(str);
    return d instanceof Date && !isNaN(d) && d.toISOString() === str; // valid date
}
function average(data) {
    if (data.length == 0) {
        return 0;
    } else {
        return data.reduce((a, b) => a + b, 0) / data.length;
    }
}
function dataCal(data) {
    let res = [];
    for (let i = 0; i < 24; i++) {
        let a = [];
        data.map((e) => {
            let d = new Date(e[0]);
            let h = d.getHours();
            if (h == i) {
                a.push(parseFloat(e[1]));
            }
        });
        res.push(a);
    }
    let result = [];
    res.map((e) => result.push(average(e)));
    return result;
}

export const getDayTemperatures = async (req, res, next) => {
    let date = req.query["date"] ? req.query["date"] : null;
    let params;
    if (date && isIsoDate(date)) {
        let today = new Date();
        let d = new Date(date);
        if (
            today.getFullYear() == d.getFullYear() &&
            today.getMonth() == d.getMonth() &&
            today.getDate() == d.getDate()
        ) {
            params = {
                hours: 24,
            };
        } else {
            let startD = new Date(
                `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()}`
            );
            let startDString = startD.toISOString();
            let endD = new Date(
                `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate() + 1}`
            );
            let endDString = endD.toISOString();
            params = {
                start_time: startDString,
                end_time: endDString,
            };
        }
    } else {
        params = {
            hours: 24,
        };
    }
    await axios
        .get(
            `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds/temperature/data/chart`,
            {
                params: params,
                headers: {
                    "X-AIO-Key": process.env.ADAFRUIT_KEY,
                },
            }
        )
        .then(({ data }) => {
            let values = data["data"];
            let avgValues = dataCal(values);
            let result = [];
            for (let i = 0; i < 24; i++) {
                result.push({ hour: i, value: avgValues[i] });
            }
            res.status(200).json({ feed_key: "temperature", data: result });
        })
        .catch((error) => {
            res.status(400);
            return next(new Error(error.message));
        });
};

export const getDayHumidities = async (req, res, next) => {
    let date = req.query["date"] ? req.query["date"] : null;
    let params;
    if (date && isIsoDate(date)) {
        let today = new Date();
        let d = new Date(date);
        if (
            today.getFullYear() == d.getFullYear() &&
            today.getMonth() == d.getMonth() &&
            today.getDate() == d.getDate()
        ) {
            params = {
                hours: 24,
            };
        } else {
            let startD = new Date(
                `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()}`
            );
            let startDString = startD.toISOString();
            let endD = new Date(
                `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate() + 1}`
            );
            let endDString = endD.toISOString();
            params = {
                start_time: startDString,
                end_time: endDString,
            };
        }
    } else {
        params = {
            hours: 24,
        };
    }
    await axios
        .get(
            `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds/humidity/data/chart`,
            {
                params: params,
                headers: {
                    "X-AIO-Key": process.env.ADAFRUIT_KEY,
                },
            }
        )
        .then(({ data }) => {
            let values = data["data"];
            let avgValues = dataCal(values);
            let result = [];
            for (let i = 0; i < 24; i++) {
                result.push({ hour: i, value: avgValues[i] });
            }
            res.status(200).json({ feed_key: "humidity", data: result });
        })
        .catch((error) => {
            res.status(400);
            return next(new Error(error.message));
        });
};

export const getDaySoildMoistures = async (req, res, next) => {
    let date = req.query["date"] ? req.query["date"] : null;
    let params;
    if (date && isIsoDate(date)) {
        let today = new Date();
        let d = new Date(date);
        if (
            today.getFullYear() == d.getFullYear() &&
            today.getMonth() == d.getMonth() &&
            today.getDate() == d.getDate()
        ) {
            params = {
                hours: 24,
            };
        } else {
            let startD = new Date(
                `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()}`
            );
            let startDString = startD.toISOString();
            let endD = new Date(
                `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate() + 1}`
            );
            let endDString = endD.toISOString();
            params = {
                start_time: startDString,
                end_time: endDString,
            };
        }
    } else {
        params = {
            hours: 24,
        };
    }
    await axios
        .get(
            `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds/soild-moisture/data/chart`,
            {
                params: params,
                headers: {
                    "X-AIO-Key": process.env.ADAFRUIT_KEY,
                },
            }
        )
        .then(({ data }) => {
            let values = data["data"];
            let avgValues = dataCal(values);
            let result = [];
            for (let i = 0; i < 24; i++) {
                result.push({ hour: i, value: avgValues[i] });
            }
            res.status(200).json({ feed_key: "soild-moisture", data: result });
        })
        .catch((error) => {
            res.status(400);
            return next(new Error(error.message));
        });
};
