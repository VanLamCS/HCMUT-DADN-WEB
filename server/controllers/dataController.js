import axios from "axios";
import Notification from "../models/notificationModel.js";
import { publishData } from "../utils/mqttHelper.js";
import { adaRequest } from "../utils/axios.js";

export const lastTemperature = async (req, res, next) => {
    adaRequest
        .get("/feeds/temperature/data/last")
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

export const lastHumidity = async (req, res, next) => {
    adaRequest
        .get("/feeds/humidity/data/last")
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

export const lastSoildMoisture = async (req, res, next) => {
    adaRequest
        .get("/feeds/soild-moisture/data/last")
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

export const lastFan = async (req, res, next) => {
    adaRequest
        .get("/feeds/fan/data/last")
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

export const lastLight = async (req, res, next) => {
    adaRequest
        .get("/feeds/light/data/last")
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

export const lastMode = async (req, res, next) => {
    adaRequest
        .get("/feeds/mode/data/last")
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

export const lastPump = async (req, res, next) => {
    adaRequest
        .get("/feeds/pump/data/last")
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

export const lastHighSoidMoisture = async (req, res, next) => {
    adaRequest
        .get("/feeds/humidity-range/data/last")
        .then(({ data }) => {
            res.status(200).json({
                ...data,
                feed_key: "soild-moisture-high-range",
                message: "successful",
            });
        })
        .catch((error) => {
            res.status(400);
            return next(new Error(error.message));
        });
};

export const lastLowSoidMoisture = async (req, res, next) => {
    adaRequest
        .get("/feeds/soild-moisture-range/data/last")
        .then(({ data }) => {
            res.status(200).json({
                ...data,
                feed_key: "soild-moisture-low-range",
                message: "successful",
            });
        })
        .catch((error) => {
            res.status(400);
            return next(new Error(error.message));
        });
};

export const lastSoildMoistureRange = async (req, res, next) => {
    let low = null;
    let high = null;
    try {
        const highReq = await adaRequest.get("/feeds/humidity-range/data/last");
        const lowReq = await adaRequest.get(
            "/feeds/soild-moisture-range/data/last"
        );
        high = parseInt(highReq.data.value);
        low = parseInt(lowReq.data.value);
        res.status(200).json({
            message: "successful",
            high: high,
            low: low,
        });
    } catch (error) {
        res.status(400);
        return next(new Error(error.message));
    }
};

const handleReturn = async (result, res, next) => {
    if (result) {
        res.status(201).json({
            message: "Set data successful",
        });
    } else {
        res.status(400);
        return next(new Error("Set data failed"));
    }
};

export const setFan = async (req, res, next) => {
    const { value } = req.body;
    if (!value) {
        res.status(400);
        return next(new Error("Value is not sent!"));
    } else {
        let temperature = parseFloat(value);
        if (temperature >= 0 && temperature <= 1) {
            publishData("fan", temperature, (result) =>
                handleReturn(result, res, next)
            );
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
        let mode = parseFloat(value);
        if (mode >= 0 && mode <= 1) {
            publishData("mode", mode, (result) =>
                handleReturn(result, res, next)
            );
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
        let light = parseFloat(value);
        if (light >= 0 && light <= 1) {
            publishData("light", light, (result) =>
                handleReturn(result, res, next)
            );
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
        let pump = parseFloat(value);
        if (pump >= 0 && pump <= 1) {
            publishData("pump", pump, (result) =>
                handleReturn(result, res, next)
            );
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
    adaRequest
        .get(`/feeds/temperature/data/chart`, {
            params: params,
        })
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
    adaRequest
        .get(`/feeds/humidity/data/chart`, {
            params: params,
        })
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
    adaRequest
        .get(`/feeds/soild-moisture/data/chart`, {
            params: params,
        })
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
function dataCal(data, today) {
    if (data.length > 0) {
        let result = [];
        let latest;
        if (today) {
            latest = new Date(data[data.length - 1][0]);
        } else {
            latest = new Date(data[data.length - 1][0]);
            latest.setHours(23);
        }
        let arr = new Array(24).fill([]);
        data.map((e) => {
            const d = new Date(e[0]);
            let t = d.getHours();
            arr[t] = [...arr[t], parseFloat(e[1])];
        });
        let eArr = new Array(24).fill(0);
        arr.map((e, i) => {
            eArr[i] = average(e);
        });
        for (let i = latest.getHours(), count = 23; count >= 0; count--) {
            result[count] = { hour: i, value: eArr[i] };
            if (i == 0) {
                i = 23;
            } else {
                i--;
            }
        }
        return result;
    } else {
        return [];
    }
}

export const getDayTemperatures = async (req, res, next) => {
    let date = req.query["date"] ? req.query["date"] : null;
    let params;
    let now = true;
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
            now = false;
        }
    } else {
        params = {
            hours: 24,
        };
    }
    adaRequest
        .get(`/feeds/temperature/data/chart`, {
            params: params,
        })
        .then(({ data }) => {
            let values = data["data"];
            let ld = new Date(values[values.length - 1][0]);
            let newValues = values.filter((e) => {
                const d = new Date(e[0]);
                if (
                    d.getHours() == ld.getHours() &&
                    d.getDate() == ld.getDate() - 1
                ) {
                    return false;
                }
                return true;
            });
            let result = dataCal(newValues, now);
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
    let now = true;
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
            now = false;
        }
    } else {
        params = {
            hours: 24,
        };
    }
    adaRequest
        .get(`/feeds/humidity/data/chart`, {
            params: params,
        })
        .then(({ data }) => {
            let values = data["data"];
            let ld = new Date(values[values.length - 1][0]);
            let newValues = values.filter((e) => {
                const d = new Date(e[0]);
                if (
                    d.getHours() == ld.getHours() &&
                    d.getDate() == ld.getDate() - 1
                ) {
                    return false;
                }
                return true;
            });
            let result = dataCal(newValues, now);
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
    let now = true;
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
            now = false;
        }
    } else {
        params = {
            hours: 24,
        };
    }
    adaRequest
        .get(`/feeds/soild-moisture/data/chart`, {
            params: params,
        })
        .then(({ data }) => {
            let values = data["data"];
            let ld = new Date(values[values.length - 1][0]);
            let newValues = values.filter((e) => {
                const d = new Date(e[0]);
                if (
                    d.getHours() == ld.getHours() &&
                    d.getDate() == ld.getDate() - 1
                ) {
                    return false;
                }
                return true;
            });
            let result = dataCal(newValues, now);
            res.status(200).json({ feed_key: "soild-moisture", data: result });
        })
        .catch((error) => {
            res.status(400);
            return next(new Error(error.message));
        });
};

export const getPlantsStatus = async (req, res, next) => {
    let limit = req.query["limit"];
    limit = limit ? (parseInt(limit) > 0 ? parseInt(limit) : 10) : 10;
    adaRequest
        .get(`/feeds/person/data`, {
            params: {
                limit: limit,
            },
        })
        .then((data) => {
            let newData = data.data.filter(({ value }) => {
                if (!(value === "None" || value === "none")) {
                    return true;
                }
                return false;
            });
            newData = newData.map(({ value, created_at }) => ({
                value,
                time: created_at,
            }));
            res.status(200).json({ message: "successful", data: newData });
        })
        .catch((error) => {
            res.status(400);
            return next(new Error("Query plants status failed"));
        });
};

export const setSoildMoistureRange = async (req, res, next) => {
    console.log("check: ", req.body);
    let { high, low } = req.body;
    if (!high && !low && high != 0 && low != 0) {
        res.status(400);
        return next(new Error("Value is not sent!"));
    } else {
        if (high !== 0) {
            high = high ? parseInt(high) : null;
        }
        if (low !== 0) {
            low = low ? parseInt(low) : null;
        }
        if (high !== null && (high < 0 || high > 100)) {
            res.status(400);
            return next(new Error("High value is not valid"));
        }
        if (low !== null && (low < 0 || low > 100)) {
            res.status(400);
            return next(new Error("Low value is not valid"));
        }
        if (high !== null && low !== null && high < low) {
            res.status(400);
            return next(
                new Error("High value must not be lower than low value")
            );
        }
        if (high !== null) {
            publishData("soild-moisture-high-range", high, (result) => {
                if (!result) {
                    res.status(400);
                    return next(new Error("Set high value failed"));
                }
            });
        }
        if (low !== null) {
            publishData("soild-moisture-low-range", low, (result) => {
                if (!result) {
                    res.status(400);
                    return next(new Error("Set low value failed"));
                }
            });
        }
        console.log("success")
        res.status(200).json({ message: "successful" });
    }
};
