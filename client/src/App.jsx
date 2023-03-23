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
import { get24SolidHumidities, get24SolidMoistures, get24SolidTemperatures } from "./api";
import { setDataCharts } from "./features/dataChart";
import { useDispatch } from "react-redux";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);
  const [reload, setReload] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const dataProcessing = async () => {
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
        dataDayHumidities: dataChartMoisures,
        dataDayMoisures: dataChartHumidities,
        dataDayTemperatures: dataChartTemperatures,
      })
    );
  };
  useEffect(() => {
    dataProcessing()
  }, [])
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline/>
        <div className="app">
          {!user ? (
            <Routes>
              <Route path="/" element={<Login reload={reload} setReload={setReload} />}></Route>
              <Route path="/login" element={<Login reload={reload} setReload={setReload} />} />
            </Routes>
          ) : (
            <>
              <Sidebar openMobile={openMobile} setOpenMobile={setOpenMobile} />
              <main className="content">
                <Topbar reload={reload} setReload={setReload} openMobile={openMobile} setOpenMobile={setOpenMobile} />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<DashBoard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/line-humidities" element={<Line whatRender="Humidities" />} />
                  <Route path="/line-temperatures" element={<Line whatRender="Temperatures" />} />
                  <Route path="/line-moisures" element={<Line whatRender="Moisures" />} />
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
