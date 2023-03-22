import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

const Line = ({ whatRender }) => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle={`${whatRender} for the last 24 hours`} />
      <Box height="75vh">
        <LineChart whatRender={whatRender} />
      </Box>
    </Box>
  );
};

export default Line;
