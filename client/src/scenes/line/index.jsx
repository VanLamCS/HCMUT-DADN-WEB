import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  get24SolidHumidities,
  get24SolidMoistures,
  get24SolidTemperatures,
} from "../../api";
import { setDataCharts } from "../../features/dataChart";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Line = ({ whatRender }) => {
  const [value, setValue] = React.useState(dayjs());
  const [reload, setReload] = React.useState(false);
  const dispatch = useDispatch();
  const dataDayChart = useSelector((state) => state.dataDayChart);

  const fetchData = async () => {
    try {
      if (whatRender === "Soil Moistures") {
        const resMoisures = await get24SolidMoistures(value.toISOString());
        const tempMoisures = resMoisures.data.data;
        tempMoisures.forEach((obj) => {
          obj.x = obj.hour;
          delete obj.hour;
          obj.y = obj.value;
          delete obj.value;
        });
        const dataChartMoisures = {
          id: "Soil Moistures",
          data: tempMoisures,
        };
        dispatch(
          setDataCharts({
            ...dataDayChart,
            dataDayMoisures: dataChartMoisures,
          })
        );
      } else if (whatRender === "Temperatures") {
        const resTemperatures = await get24SolidTemperatures(
          value.toISOString()
        );
        const tempTemperatures = resTemperatures.data.data;
        tempTemperatures.forEach((obj) => {
          obj.x = obj.hour;
          delete obj.hour;
          obj.y = obj.value;
          delete obj.value;
        });
        const dataChartTemperatures = {
          id: "Temperatures",
          data: tempTemperatures,
        };
        dispatch(
          setDataCharts({
            ...dataDayChart,
            dataDayTemperatures: dataChartTemperatures,
          })
        );
      } else if (whatRender === "Humidities") {
        const resHumidities = await get24SolidHumidities(value.toISOString());
        const tempHumidities = resHumidities.data.data;
        tempHumidities.forEach((obj) => {
          obj.x = obj.hour;
          delete obj.hour;
          obj.y = obj.value;
          delete obj.value;
        });
        const dataChartHumidities = {
          id: "Humidities",
          data: tempHumidities,
        };
        dispatch(
          setDataCharts({
            ...dataDayChart,
            dataDayHumidities: dataChartHumidities,
          })
        );
      }
    } catch (error) {
      toast.error("Error data at this time");
    }
  };

  useEffect(() => {
    fetchData();
  }, [value]);

  useEffect(() => {
    setValue(dayjs());
  }, [whatRender]);

  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle={`${whatRender} for 24 hours`} />
      <Box sx={{ width: { md: "50%", xs: "100%" } }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              label="Choose time"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <Box height="75vh">
        <LineChart
          whatRender={whatRender}
          reload={reload}
          setReload={setReload}
          value={value}
        />
      </Box>
    </Box>
  );
};

export default Line;
