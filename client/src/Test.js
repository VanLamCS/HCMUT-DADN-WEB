import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000"); // Replace with your server's URL

function Test() {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [soildMoisture, setSoildMoisture] = useState(0);

  axios.get("http://localhost:5000/api/data/lasttemperature").then((data) => {
    setTemperature(data.data.data.value);
  });
  axios.get("http://localhost:5000/api/data/lasthumidity").then((data) => {
    setHumidity(data.data.data.value);
  });
  axios.get("http://localhost:5000/api/data/lastsoildmoisture").then((data) => {
    setSoildMoisture(data.data.data.value);
  });

  useEffect(() => {
    socket.on("temperatureUpdate", ({ temperature }) => {
      setTemperature(temperature);
    });

    socket.on("humidityUpdate", ({ humidity }) => {
      setHumidity(humidity);
    });

    socket.on("soildMoistureUpdate", ({ soildMoisture }) => {
      setSoildMoisture(soildMoisture);
    });
  }, []);

  return (
    <div>
      <p>Temperature: {temperature} &#8451;</p>
      <p>Humidity: {humidity} %</p>
      <p>Soild-moisture: {soildMoisture} %</p>
    </div>
  );
}

export default Test;
