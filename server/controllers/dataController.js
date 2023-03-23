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
    adaRequest
        .get(`/feeds/temperature/data/chart`, {
            params: params,
        })
        .then(({ data }) => {
            let values = data["data"];
            let avgValues = dataCal(values);
            let result = [];
            return res.json(values);
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
    adaRequest
        .get(`/feeds/humidity/data/chart`, {
            params: params,
        })
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
    adaRequest
        .get(`/feeds/soild-moisture/data/chart`, {
            params: params,
        })
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
