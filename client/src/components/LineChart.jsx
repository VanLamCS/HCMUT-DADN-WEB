import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LineChart = ({ whatRender = "All", value }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showChart, setShowChart] = useState([]);

  const dataMoisures = useSelector(
    (state) => state.dataDayChart.dataDayMoisures
  );

  const dataHumidities = useSelector(
    (state) => state.dataDayChart.dataDayHumidities
  );

  const dataTemperatures = useSelector(
    (state) => state.dataDayChart.dataDayTemperatures
  );

  const fetchData = async () => {
    const renderData = [];
    if (
      whatRender == "All" &&
      Object.keys(dataMoisures).length !== 0 &&
      Object.keys(dataHumidities).length !== 0 &&
      Object.keys(dataTemperatures).length !== 0
    ) {
      renderData.push(dataMoisures);
      renderData.push(dataHumidities);
      renderData.push(dataTemperatures);
    } else if (
      whatRender === "Soil Moistures" &&
      Object.keys(dataMoisures).length !== 0
    ) {
      // console.log("lag lag", dataMoisures)
      renderData.push(dataMoisures);
    } else if (
      whatRender === "Temperatures" &&
      Object.keys(dataTemperatures).length !== 0
    ) {
      renderData.push(dataTemperatures);
    } else if (
      whatRender === "Humidities" &&
      Object.keys(dataHumidities).length !== 0
    ) {
      renderData.push(dataHumidities);
    }
    setShowChart(renderData);
  };

  useEffect(() => {
    fetchData();
  }, [whatRender, dataMoisures, dataHumidities, dataTemperatures, value]);

  return (
    <ResponsiveLine
      data={showChart}
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
        legend: whatRender === "Temperatures" ? `unit(°C)` : "unit(%)", // added
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