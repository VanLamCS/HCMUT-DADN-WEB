import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Drawer, useMediaQuery, Typography, Popover } from "@mui/material";
import { Menu } from "@mui/icons-material";
import SidebarDrawer from "./SideBarDrawer";
import * as React from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Topbar = ({ openMobile, setOpenMobile, reload, setReload }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState(localStorage.getItem("name"));
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setReload(!reload);
    toast.success("Logut successfully");
  };

  const open = Boolean(anchorEl);

  const popoverContent = (
    <Box p={2}>
      <Typography variant="subtitle1">{name}</Typography>
      <Typography variant="body2" color="text.secondary">
        {email}
      </Typography>
      <Box mt={2}>
        <Box display="flex" justifyContent="center">
          <IconButton
            variant="contained"
            color="secondary"
            onClick={handleClose}
          >
            <Typography onClick={handleLogout}>Logout</Typography>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      display="flex"
      flexDirection="row-reverse"
      justifyContent="space-between"
      p={2}
    >
      {/* SEARCH BAR */}
      {isMobile && (
        <IconButton
          color="inherit"
          edge="start"
          style={{ outline: "none" }}
          onClick={() => setOpenMobile((pre) => !pre)}
        >
          <Menu />
        </IconButton>
      )}
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton onClick={handleClick}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {popoverContent}
      </Popover>

      <Drawer
        variant="temporary"
        anchor="left"
        open={openMobile}
        onClose={() => setOpenMobile((pre) => !pre)}
        ModalProps={{ keepMounted: true }}
      >
        <SidebarDrawer openMobile={openMobile} setOpenMobile={setOpenMobile} />
      </Drawer>
    </Box>
  );
};

export default Topbar;
