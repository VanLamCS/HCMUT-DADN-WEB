import mqtt from "mqtt";

const realtimeUpdate = (io) => {
    const username = `${process.env.ADAFRUIT_USERNAME}`;
    const key = `${process.env.ADAFRUIT_KEY}`;
    const host = "mqtt://io.adafruit.com";
    const client = mqtt.connect(host, {
        username: username,
        password: key,
    });

    client.on("connect", () => {
        // console.log("Connected to adafruit");
        // Subscribe to the temperature feed
        client.subscribe(`${username}/feeds/temperature`);
        // console.log("Subscribe temperature feed");

        // Subscribe to the humidity feed
        client.subscribe(`${username}/feeds/humidity`);
        // console.log("Subscribe humidity feed");

        // Subscribe to the soild-moisture feed
        client.subscribe(`${username}/feeds/soild-moisture`);
        // console.log("Subscribe soild-moisture feed");

        // Subscribe to the fan feed
        client.subscribe(`${username}/feeds/fan`);
        // console.log("Subscribe fan feed");

        // Subscribe to the mode feed
        client.subscribe(`${username}/feeds/mode`);
        // console.log("Subscribe mode feed");

        // Subscribe to the pump feed
        client.subscribe(`${username}/feeds/pump`);
        // console.log("Subscribe pump feed");

        // Subscribe to the light feed
        client.subscribe(`${username}/feeds/light`);
        // console.log("Subscribe light feed");

        // Subscribe to the crops status feed
        client.subscribe(`${username}/feeds/person`);
        // console.log("Subscribe crops status feed");
    });

    client.on("message", (topic, message) => {
        // Parse the message data as a float
        let data = null;
        if (!topic.endsWith("person")) {
            data = parseFloat(message.toString());
        } else {
            data = message.toString();
        }

        if (topic.endsWith("temperature")) {
            // Emit a "temperatureUpdate" event with the new temperature data
            io.emit("temperatureUpdate", { temperature: data });
            console.log(`Temperature: ${data}°C`);
        } else if (topic.endsWith("humidity")) {
            // Emit a "humidityUpdate" event with the new humidity data
            io.emit("humidityUpdate", { humidity: data });
            console.log(`Humidity: ${data}%`);
        } else if (topic.endsWith("soild-moisture")) {
            // Emit a "soildMoistureUpdate" event with the new soild-moisture data
            io.emit("soildMoistureUpdate", { soildMoisture: data });
            console.log(`Soild-moisture: ${data}%`);
        } else if (topic.endsWith("fan")) {
            // Emit a "fanUpdate" event with the new fan data
            io.emit("fanUpdate", { fan: data });
            console.log(`Fan: ${data}`);
        } else if (topic.endsWith("mode")) {
            // Emit a "modeUpdate" event with the new mode data
            io.emit("modeUpdate", { mode: data });
            console.log(`Mode: ${data}`);
        } else if (topic.endsWith("pump")) {
            // Emit a "pumpUpdate" event with the new pump data
            io.emit("pumpUpdate", { pump: data });
            console.log(`Pump: ${data}`);
        } else if (topic.endsWith("light")) {
            // Emit a "lightUpdate" event with the new light data
            io.emit("lightUpdate", { light: data });
            console.log(`Light: ${data}`);
        } else if (topic.endsWith("person")) {
            if (!(data === "None" || data === "none")) {
                const current = new Date();
                io.emit("plantsStatusUpdate", {
                    value: data,
                    time: current,
                });
                console.log(`${data}`);
            }
        }
    });
};

export default realtimeUpdate;
