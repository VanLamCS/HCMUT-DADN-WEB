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
  });

  client.on("message", (topic, message) => {
    // Parse the message data as a float
    const data = parseFloat(message.toString());

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
    }
  });
};

export default realtimeUpdate;
