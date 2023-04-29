import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Home from "./scenes/home";
import DashBoard from "./scenes/dashboard";
import Form from "./scenes/form";
import Line from "./scenes/line";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./scenes/login";
import {
  get24SolidHumidities,
  get24SolidMoistures,
  get24SolidTemperatures,
  getFan,
  getHumidity,
  getLed,
  getMode,
  getNotification,
  getPlantStatus,
  getPump,
  getSoildMoisture,
  getTemperature,
} from "./api";
import { setDataCharts } from "./features/dataChart";
import { useDispatch } from "react-redux";
import { getDataNotification } from "./features/notification";
import { getDeviceStatus } from "./features/dataDashboard";
import { getInformationHome } from "./features/dataHome";
import { io } from "socket.io-client";
import { dispatchPlantStatus } from "./features/dataPlantStatus";
const socket = io("http://localhost:8000"); // Replace with your server's URL

function App() {
  const [theme, colorMode] = useMode();
  const [openMobile, setOpenMobile] = useState(false);
  const [reload, setReload] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const dataProcessing = async () => {
    const dataTemperature = await getTemperature();
    const dataHumidity = await getHumidity();
    const dataSoildMoisture = await getSoildMoisture();

    dispatch(
      getInformationHome({
        temperature: dataTemperature.data.value,
        humidity: dataHumidity.data.value,
        moisture: dataSoildMoisture.data.value,
      })
    );

    //SOCKET
    socket.on("temperatureUpdate", ({ temperature }) => {
      dispatch(
        getInformationHome({
          temperature: temperature,
          humidity: dataHumidity.data.value,
          moisture: dataSoildMoisture.data.value,
        })
      );
    });

    socket.on("humidityUpdate", ({ humidity }) => {
      dispatch(
        getInformationHome({
          temperature: dataTemperature.data.value,
          humidity: humidity,
          moisture: dataSoildMoisture.data.value,
        })
      );
    });

    socket.on("soildMoistureUpdate", ({ soildMoisture }) => {
      dispatch(
        getInformationHome({
          temperature: dataTemperature.data.value,
          humidity: dataHumidity.data.value,
          moisture: soildMoisture,
        })
      );
    });

    //get Notifications
    const resNotifycation = await getNotification();

    const dataNotifications = resNotifycation.data.data;

    var updatedData = [];

    if (Object.keys(dataNotifications).length !== 0) {
      updatedData = dataNotifications.map((obj) => {
        const dateObj = new Date(obj.createdAt);
        const year = dateObj.getFullYear();
        const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
        const day = ("0" + dateObj.getDate()).slice(-2);
        const hours = ("0" + dateObj.getHours()).slice(-2);
        const minutes = ("0" + dateObj.getMinutes()).slice(-2);
        const seconds = ("0" + dateObj.getSeconds()).slice(-2);
        return {
          ...obj,
          createdAt: `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`,
        };
      });
    }

    dispatch(getDataNotification(updatedData));

    socket.on("newNotification", (data) => {
      const dateObj = new Date(data.createdAt);
      const year = dateObj.getFullYear();
      const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
      const day = ("0" + dateObj.getDate()).slice(-2);
      const hours = ("0" + dateObj.getHours()).slice(-2);
      const minutes = ("0" + dateObj.getMinutes()).slice(-2);
      const seconds = ("0" + dateObj.getSeconds()).slice(-2);

      const newData = {
        content: data.message,
        createdAt: `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`,
      };

      const updatedNotifications = [newData, ...updatedData];
      dispatch(getDataNotification(updatedNotifications));
    });

    //get Plant Status
    const resPlantStatus = await getPlantStatus();

    const dataPlantStatus = resPlantStatus.data.data;

    var updatedDataPlantStatus = [];

    if (Object.keys(dataPlantStatus).length !== 0) {
      updatedDataPlantStatus = dataPlantStatus.map((obj) => {
        const dateObj = new Date(obj.time);
        const year = dateObj.getFullYear();
        const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
        const day = ("0" + dateObj.getDate()).slice(-2);
        const hours = ("0" + dateObj.getHours()).slice(-2);
        const minutes = ("0" + dateObj.getMinutes()).slice(-2);
        const seconds = ("0" + dateObj.getSeconds()).slice(-2);
        return {
          ...obj,
          time: `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`,
        };
      });
    }

    dispatch(dispatchPlantStatus(updatedDataPlantStatus));

    socket.on("plantsStatusUpdate", ({ value, time }) => {
      const dateObj = new Date(time);
      const year = dateObj.getFullYear();
      const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
      const day = ("0" + dateObj.getDate()).slice(-2);
      const hours = ("0" + dateObj.getHours()).slice(-2);
      const minutes = ("0" + dateObj.getMinutes()).slice(-2);
      const seconds = ("0" + dateObj.getSeconds()).slice(-2);

      const newData = {
        value,
        time: `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`,
      };

      const updatedDataPlantStatus = [newData, ...updatedData];
      dispatch(dispatchPlantStatus(updatedDataPlantStatus));
    });

    //Line chart
    const resMoisures = await get24SolidMoistures();
    const resHumidities = await get24SolidHumidities();
    const resTemperatures = await get24SolidTemperatures();

    const tempMoisures = resMoisures.data.data;
    const tempHumidities = resHumidities.data.data;
    const tempTemperatures = resTemperatures.data.data;

    tempMoisures.forEach((obj) => {
      obj.x = obj.hour;
      delete obj.hour;
      obj.y = obj.value;
      delete obj.value;
    });

    tempHumidities.forEach((obj) => {
      obj.x = obj.hour;
      delete obj.hour;
      obj.y = obj.value;
      delete obj.value;
    });

    tempTemperatures.forEach((obj) => {
      obj.x = obj.hour;
      delete obj.hour;
      obj.y = obj.value;
      delete obj.value;
    });

    const dataChartMoisures = {
      id: "Moisures",
      data: tempMoisures,
    };

    const dataChartHumidities = {
      id: "Humidities",
      data: tempHumidities,
    };

    const dataChartTemperatures = {
      id: "Temperatures",
      data: tempTemperatures,
    };

    dispatch(
      setDataCharts({
        dataDayHumidities: dataChartHumidities,
        dataDayMoisures: dataChartMoisures,
        dataDayTemperatures: dataChartTemperatures,
      })
    );
  };
  useEffect(() => {
    dataProcessing();
  }, []);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!user ? (
            <Routes>
              <Route
                path="/"
                element={<Login reload={reload} setReload={setReload} />}
              ></Route>
              <Route
                path="/login"
                element={<Login reload={reload} setReload={setReload} />}
              />
            </Routes>
          ) : (
            <>
              <Sidebar openMobile={openMobile} setOpenMobile={setOpenMobile} />
              <main className="content">
                <Topbar
                  reload={reload}
                  setReload={setReload}
                  openMobile={openMobile}
                  setOpenMobile={setOpenMobile}
                />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<DashBoard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/form" element={<Form />} />
                  <Route
                    path="/line-moisures"
                    element={<Line whatRender="Moisures" />}
                  />
                  <Route
                    path="/line-temperatures"
                    element={<Line whatRender="Temperatures" />}
                  />
                  <Route
                    path="/line-humidities"
                    element={<Line whatRender="Humidities" />}
                  />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/calendar" element={<Calendar />} />
                </Routes>
              </main>
            </>
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
