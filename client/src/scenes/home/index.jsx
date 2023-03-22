import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import PercentIcon from "@mui/icons-material/Percent";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { getHumidity, getSoildMoisture, getTemperature } from "../../api";
import { useNavigate } from "react-router-dom";
const socket = io("http://localhost:8000"); // Replace with your server's URL

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [soildMoisture, setSoildMoisture] = useState(0);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const fetchData = async () => {
    const dataTemperature = await getTemperature();
    const dataHumidity = await getHumidity();
    const dataSoildMoisture = await getSoildMoisture();

    setTemperature(dataTemperature.data.value);
    setHumidity(dataHumidity.data.value);
    setSoildMoisture(dataSoildMoisture.data.value);
  };

  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [renderTemperature, setRenderTemperature] = useState(0);
  const [renderHumidity, setRenderHumidity] = useState(0);
  const [renderSoildMoisture, setRenderSoildMoisture] = useState(0);

  useEffect(() => {
    if (
      temperature != 0 &&
      Math.round(renderTemperature) != Math.round(temperature)
    ) {
      const interval = setInterval(() => {
        if (Math.round(renderTemperature) < Math.round(temperature)) {
          setRenderTemperature((pre) => pre + 1);
        } else {
          setRenderTemperature((pre) => pre - 1);
        }
      }, 5);
      return () => clearInterval(interval);
    }
  }, [renderTemperature, temperature]);

  useEffect(() => {
    if (humidity != 0 && Math.round(renderHumidity) != Math.round(humidity)) {
      const interval = setInterval(() => {
        if (Math.round(renderHumidity) < Math.round(humidity)) {
          setRenderHumidity((pre) => pre + 1);
        } else {
          setRenderHumidity((pre) => pre - 1);
        }
      }, 5);
      return () => clearInterval(interval);
    }
  }, [renderHumidity, humidity]);

  useEffect(() => {
    if (
      soildMoisture != 0 &&
      Math.round(renderSoildMoisture) != Math.round(soildMoisture)
    ) {
      const interval = setInterval(() => {
        if (Math.round(renderSoildMoisture) < Math.round(soildMoisture)) {
          setRenderSoildMoisture((pre) => pre + 1);
        } else {
          setRenderSoildMoisture((pre) => pre - 1);
        }
      }, 5);
      return () => clearInterval(interval);
    }
  }, [renderSoildMoisture, soildMoisture]);

  useEffect(() => {
    console.log("fetch data: ", window.location);
    if (user) {
      fetchData();

      socket.on("temperatureUpdate", ({ temperature }) => {
        setTemperature(temperature);
        console.log("Temperature: ", temperature);
      });

      socket.on("humidityUpdate", ({ humidity }) => {
        setHumidity(humidity);
        console.log("Humidity: ", humidity);
      });

      socket.on("soildMoistureUpdate", ({ soildMoisture }) => {
        setSoildMoisture(soildMoisture);
        console.log("Soild Moisture: ", soildMoisture);
      });
    }
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        display="flex"
        flexDirection={isMobile && "column"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title="HOME" subtitle="Welcome to your Green House" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display={isMobile ? "flex" : "grid"}
        flexDirection={isMobile ? "column" : "none"}
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Temperature"
            progress="0.75"
            increase={renderTemperature}
            icon={
              <ThermostatIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Humidity"
            progress="0.50"
            increase={renderHumidity}
            icon={
              <PercentIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Soild Moisture"
            progress="0.80"
            increase={renderSoildMoisture}
            icon={
              <PercentIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                In 24 hours
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Overall Statictics
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{
                    fontSize: "26px",
                    color: colors.greenAccent[500],
                  }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{ transition: "all 1s ease" }}
            height="250px"
            m="-20px 0 0 0"
          >
            <LineChart />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
