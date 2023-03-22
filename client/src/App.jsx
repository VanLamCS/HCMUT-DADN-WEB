import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Home from "./scenes/home";
import DashBoard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./scenes/login";
import { useEffect } from "react";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);
  const [reload, setReload] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"));

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
                <Topbar openMobile={openMobile} setOpenMobile={setOpenMobile} />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<DashBoard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line-humidities" element={<Line whatRender="Humidities" />} />
                  <Route path="/line-temperatures" element={<Line whatRender="Temperatures" />} />
                  <Route path="/line-moisures" element={<Line whatRender="Moisures" />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/geography" element={<Geography />} />
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
