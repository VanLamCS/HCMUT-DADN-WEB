import { Box, Typography, useTheme, Stack } from "@mui/material";
import { tokens } from "../theme";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px" p="10px 0">
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <div>
          <Box display="flex" justifyContent="space-between">
            <Box>{icon}</Box>
          </Box>
          <Box display="flex" justifyContent="space-between" mt="2px">
            <Typography
              pt="10px"
              fontSize="1.4rem"
              variant="h5"
              sx={{ color: colors.greenAccent[500] }}
            >
              {subtitle}
            </Typography>
          </Box>
        </div>

        <Typography
          fontSize="2rem"
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
          dangerouslySetInnerHTML={{
            __html:
              subtitle === "Temperature"
                ? `${increase} &#8451;`
                : `${increase} %`,
          }}
        />
      </Stack>
    </Box>
  );
};

export default StatBox;
