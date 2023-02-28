import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { getHumidity, getSoildMoisture, getTemperature } from "./api";

const socket = io("http://localhost:5000"); // Replace with your server's URL

function Test() {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [soildMoisture, setSoildMoisture] = useState(0);

  const fetchData = async () => {
    const dataTemperature = await getTemperature();
    const dataHumidity = await getHumidity();
    const dataSoildMoisture = await getSoildMoisture();

    setTemperature(dataTemperature.data.value);
    setHumidity(dataHumidity.data.value);
    setSoildMoisture(dataSoildMoisture.data.value);
  };

  const [renderTemperature, setRenderTemperature] = useState(0);
  const [renderHumidity, setRenderHumidity] = useState(0);
  const [renderSoildMoisture, setRenderSoildMoisture] = useState(0);

  useEffect(() => {
    if (temperature != 0 && renderTemperature < temperature) {
      const interval = setInterval(() => {
        setRenderTemperature((pre) => pre + 1);
      }, 5);
      return () => clearInterval(interval);
    }
  }, [renderTemperature, temperature]);

  useEffect(() => {
    if (humidity != 0 && renderHumidity < humidity) {
      const interval = setInterval(() => {
        setRenderHumidity((pre) => pre + 1);
      }, 5);
      return () => clearInterval(interval);
    }
  }, [renderHumidity, humidity]);

  useEffect(() => {
    if (soildMoisture != 0 && renderSoildMoisture < soildMoisture) {
      const interval = setInterval(() => {
        setRenderSoildMoisture((preTem) => preTem + 1);
      }, 5);
      return () => clearInterval(interval);
    }
  }, [renderSoildMoisture, soildMoisture]);

  useEffect(() => {
    fetchData();

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
    <>
      <div>
        <p>Temperature: {renderTemperature} &#8451;</p>
        <p>Humidity: {renderHumidity} %</p>
        <p>Soild-moisture: {renderSoildMoisture} %</p>
      </div>
    </>
  );
}

export default Test;
