import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import connectDB from "./config/connectDB.js";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import http from "http";
import route from "./routes/index.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import realtimeUpdate from "./adafruit/realtimeUpdate.js";

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log("Server is running on PORT: " + PORT);
});

const io = new Server(server, {
    cors: {
        origin: `${process.env.CLIENT_HOST}`,
    },
});
realtimeUpdate(io);
io.listen(8000);

route(app);
app.use(notFound);
app.use(errorHandler);
