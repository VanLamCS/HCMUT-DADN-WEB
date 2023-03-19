import mqtt from "mqtt";
import Notification from "../models/notificationModel.js";

const saveNotiOnDb = (feed, content, createdAt) => {
    let noti = new Notification({
        feed,
        content,
        createdAt,
    });
    noti.save()
        .then((res) => {
            console.log(`${res.content} and saved into database`);
            return true;
        })
        .catch((e) => {
            console.log(`Error ${e}`);
        });
    return false;
};

const listenEvents = (io) => {
    const username = `${process.env.ADAFRUIT_USERNAME}`;
    const key = `${process.env.ADAFRUIT_KEY}`;
    const host = "mqtt://io.adafruit.com";
    const client = mqtt.connect(host, {
        username: username,
        password: key,
    });
    client.on("connect", () => {
        /* client.subscribe(`${username}/feeds/temperature`);
        client.subscribe(`${username}/feeds/humidity`);
        client.subscribe(`${username}/feeds/soild-moisture`); */
        client.subscribe(`${username}/feeds/fan`);
        client.subscribe(`${username}/feeds/mode`);
        client.subscribe(`${username}/feeds/pump`);
        client.subscribe(`${username}/feeds/light`);
    });
    client.on("message", (topic, message) => {
        const data = parseFloat(message.toString());
        const createAt = new Date().toISOString();
        let mess = "";
        /* if(topic.endsWith('temperature')) {

        } else if(topic.endsWith('humidity')) {

        } else if(topic.endsWith('soild-moisture')) {

        } else  */ if (topic.endsWith("fan")) {
            if (data == 0) {
                mess = "Fan is turned off";
            } else if (data == 1) {
                mess = "Fan is turned on";
            } /*  else if (data == 2) {
                mess = "Fan is turned on medium";
            } else if (data == 3) {
                mess = "Fan is turned on high";
            } */ else {
                mess = "Fan status is adjusted";
            }
            saveNotiOnDb("fan", mess, createAt);
            io.emit("newNotification", { message: mess, createdAt: createAt });
        } else if (topic.endsWith("mode")) {
            if (data == 0) {
                mess = "Mode is set to manual";
            } else if (data == 1) {
                mess = "Mode is set to auto";
            } else {
                mess = "Mode is adjusted";
            }
            saveNotiOnDb("mode", mess, createAt);
            io.emit("newNotification", { message: mess, createdAt: createAt });
        } else if (topic.endsWith("pump")) {
            if (data == 0) {
                mess = "Pump is turned off";
            } else if (data == 1) {
                mess = "Pump is turned on";
            } else {
                mess = "Pump is adjusted";
            }
            saveNotiOnDb("pump", mess, createAt);
            io.emit("newNotification", { message: mess, createdAt: createAt });
        } else if (topic.endsWith("light")) {
            if (data == 0) {
                mess = "Light is turned off";
            } else if (data == 1) {
                mess = "Light is turned on";
            } else {
                mess = "Light is adjusted";
            }
            saveNotiOnDb("light", mess, createAt);
            io.emit("newNotification", { message: mess, createdAt: createAt });
        }
    });
};

export default listenEvents;
