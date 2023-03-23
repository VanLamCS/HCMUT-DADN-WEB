import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const adaRequest = axios.create({
    baseURL: `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}`,
    headers: {
        "X-AIO-Key": process.env.ADAFRUIT_KEY,
        "Content-Type": "application/json",
    },
});

export { adaRequest };
