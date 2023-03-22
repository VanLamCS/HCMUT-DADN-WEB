import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useEffect, useState } from "react";
import {
  get24SolidHumidities,
  get24SolidMoistures,
  get24SolidTemperatures,
} from "../api";

const LineChart = ({
  whatRender = "All",
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [test, setTest] = useState([]);

  const fetchData = async () => {
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

    const myArray = [];
    if (whatRender === "All") {
      myArray.push(dataChartMoisures);
      myArray.push(dataChartHumidities);
      myArray.push(dataChartTemperatures);
    } else if (whatRender === "Moisures") {
      myArray.push(dataChartMoisures);
    } else if (whatRender === "Temperatures") {
      myArray.push(dataChartTemperatures);
    } else if (whatRender === "Humidities") {
      myArray.push(dataChartHumidities);
    }
    setTest(myArray);
  };

  useEffect(() => {
    fetchData();
  }, [whatRender]);

  return (
    <ResponsiveLine
      data={test}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={{ scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: "hour", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: "value", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
