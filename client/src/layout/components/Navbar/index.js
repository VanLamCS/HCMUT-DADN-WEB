import React from "react";
import styles from "./style.module.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Avatar } from "@mui/material";

const Navbar = () => {
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);
  var content;
  if (id === "") content = "OVERVIEW";
  if (id === "create") content = "CREATE TASK";
  if (id === "chat") content = "MESSAGE";
  if (id === "task") content = "ASSIGNMENT TASK";
  if (id === "profile") content = "PROFILE";
  if (id === "user") content = "USER";
  if (id === "edittask") content = "EDIT TASK";
  if (id === "assigntask") content = "ASSIGN TASK";
  if (id === "createtask") content = "CREATE TASK";
  return (
    <div className={styles.navbar}>
      <p className={styles.navbarTitle}>{content}</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <NotificationsNoneIcon
          sx={{
            fontSize: "2.0rem",
            color: "#4658AC",
            marginRight: "20px",
          }}
        />
        <Avatar
          src={
            "https://as01.epimg.net/meristation_en/imagenes/2022/09/16/news/1663350140_632920_1663350705_noticia_normal.jpg"
          }
          sx={{
            width: "40px",
            height: "40px",
            border: "1px solid #d6d6d6",
            cursor: "pointer",
            marginRight: "6px",
          }}
        ></Avatar>
      </div>
    </div>
  );
};

export default Navbar;
