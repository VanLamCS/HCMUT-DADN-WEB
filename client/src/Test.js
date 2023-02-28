import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000"); // Replace with your server's URL

function Test() {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [soildMoisture, setSoildMoisture] = useState(null);

  async function fetchData() {
    const temperatureResponse = await axios.get("http://localhost:5000/api/data/lasttemperature");
    const humidityResponse = await axios.get("http://localhost:5000/api/data/lasthumidity");
    const soildMoistureResponse = await axios.get("http://localhost:5000/api/data/lastsoildmoisture");

    console.log("check data: ", temperatureResponse.data.data.value)
    setTemperature(temperatureResponse.data.data.value);
    setHumidity(humidityResponse.data.data.value);
    setSoildMoisture(soildMoistureResponse.data.data.value);
  }

  fetchData();
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
      <p>Temperature: {temperature ? temperature : 'loading ...'} &#8451;</p>
      <p>Humidity: {humidity ? humidity : 'loading...'} %</p>
      <p>Soild-moisture: {soildMoisture ? soildMoisture : 'loading ...'} %</p>
    </div>
  );
}

export default Test;
