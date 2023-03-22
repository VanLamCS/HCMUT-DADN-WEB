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
import listenEvents from "./processes/notificationProcesses.js";

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
listenEvents(io);
io.listen(process.env.SOCKET_PORT);

route(app);
app.use(notFound);
app.use(errorHandler);
