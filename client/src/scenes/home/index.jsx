import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import PercentIcon from "@mui/icons-material/Percent";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import { useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";

const socket = io("http://localhost:8000"); // Replace with your server's URL

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [soildMoisture, setSoildMoisture] = useState(0);
  const user = localStorage.getItem("user");
  const dispatch = useDispatch();
  const dataNotifications = useSelector(
    (state) => state.dataNotifications.message
  );

  const homeTemperature = useSelector(
    (state) => state.informationHome.temperature
  );

  const homeHumidity = useSelector((state) => state.informationHome.humidity);

  const homeMoisure = useSelector((state) => state.informationHome.moisture);

  const [renderNotification, setRenderNotification] = useState([]);

  const fetchData = async () => {
    if (homeTemperature !== -1 && homeHumidity !== -1 && homeMoisure !== -1) {
      setTemperature(homeTemperature);
      setHumidity(homeHumidity);
      setSoildMoisture(homeMoisure);
    }
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
    if (user) {
      fetchData();
    }
  }, [homeTemperature, homeHumidity, homeMoisure]);

  useEffect(() => {
    setRenderNotification(dataNotifications)
  }, [dataNotifications]);

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
                  fontSize: "36px",
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
                  fontSize: "36px",
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
                  fontSize: "36px",
                }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
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
                Last 24 hours
              </Typography>
              <Typography
                p="10px 0"
                fontSize="1.5rem"
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
                    fontSize: "36px",
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
        {/* ROW 3 */}
        <Box
          gridColumn="span 6"
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
            <Typography
              width="100%"
              color={colors.grey[100]}
              variant="h5"
              fontWeight="600"
            >
              <Typography variant="h3" color="#4cceac">Notification</Typography>
              
              {Object.keys(renderNotification).length !== 0 &&
                renderNotification.slice(0, 5).map((notification, i) => (
                  <Box
                    key={notification._id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    p="15px"
                  >
                    <Box>
                      <Typography mr="15px" color={colors.grey[100]}>
                        {notification.createdAt}
                      </Typography>
                    </Box>
                    <Box color={colors.grey[100]}>{notification.date}</Box>
                    <Box
                      backgroundColor={colors.greenAccent[500]}
                      p="5px 10px"
                      borderRadius="4px"
                      minWidth="220px"
                      textAlign="center"

                    >
                      {notification.content}
                    </Box>
                  </Box>
                ))}
            </Typography>
          </Box>
        </Box>

        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
