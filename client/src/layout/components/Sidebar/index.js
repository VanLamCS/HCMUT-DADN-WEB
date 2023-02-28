import React from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import PortraitRoundedIcon from "@mui/icons-material/PortraitRounded";
import SmsRoundedIcon from "@mui/icons-material/SmsRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import LogoutIcon from "@mui/icons-material/Logout";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Sidebar = () => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/"));
  // let navigate = useNavigate()
  const MenuItem = [
    {
      content: "Overview",
      to: "/",
      icon:
        id === "/" ? (
          <WidgetsRoundedIcon
            sx={{ fontSize: "2.2rem", color: "white", marginRight: "10px" }}
          />
        ) : (
          <WidgetsRoundedIcon
            sx={{ fontSize: "2.2rem", color: "#8E92BC", marginRight: "10px" }}
          />
        ),
    },
    {
      content: "Dashboard",
      to: "/dashboard",
      icon:
        id === "/dashboard" ? (
          <PortraitRoundedIcon
            sx={{ fontSize: "2.2rem", color: "white", marginRight: "10px" }}
          />
        ) : (
          <PortraitRoundedIcon
            sx={{ fontSize: "2.2rem", color: "#8E92BC", marginRight: "10px" }}
          />
        ),
    },
    {
      content: "Setting",
      to: "/setting",
      icon:
        id === "/setting" ? (
          <SmsRoundedIcon
            sx={{ fontSize: "2.2rem", color: "white", marginRight: "10px" }}
          />
        ) : (
          <SmsRoundedIcon
            sx={{ fontSize: "2.2rem", color: "#8E92BC", marginRight: "10px" }}
          />
        ),
    },
    {
      content: "Profile",
      to: "/profile",
      icon:
        id === "/profile" ? (
          <ManageAccountsRoundedIcon
            sx={{ fontSize: "2.5rem", color: "white", marginRight: "10px" }}
          />
        ) : (
          <ManageAccountsRoundedIcon
            sx={{ fontSize: "2.5rem", color: "#8E92BC", marginRight: "10px" }}
          />
        ),
    },
  ];
  return (
    <div className={styles.sidebar}>
      {/* <img
        className={styles.pattern}
        src={require("../../../assets/pattern.png")}
        alt="none"
      /> */}
      <div className={styles.sidebarContent}>
        <div className={styles.top}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="30"
            viewBox="0 0 34 30"
            fill="none"
          >
            <path
              d="M14.4844 27.4376C14.6789 26.9367 14.7717 26.4021 14.7572 25.865C14.7869 24.3764 15.1847 22.9184 15.9152 21.621C16.6439 20.3258 17.6831 19.2321 18.9392 18.438C19.4043 18.1885 19.814 17.8473 20.1434 17.4349C20.4729 17.0225 20.7152 16.5476 20.8558 16.0389C20.9964 15.5301 21.0323 14.9982 20.9614 14.4751C20.8905 13.9521 20.7142 13.4489 20.4432 12.996C20.0812 12.391 19.5602 11.895 18.9392 11.565C18.5832 11.318 18.2412 11.052 17.9152 10.767L17.0982 9.967C15.6012 8.3932 14.7616 6.30708 14.7512 4.135C14.7667 3.59777 14.6744 3.06288 14.4798 2.56188C14.2852 2.06089 13.9923 1.60395 13.6182 1.218C13.2459 0.832488 12.7996 0.52595 12.3062 0.316684C11.8128 0.107418 11.2822 -0.000286365 10.7462 5.71818e-07C10.2105 0.000756001 9.68046 0.108938 9.18733 0.318146C8.6942 0.527354 8.24803 0.833339 7.87522 1.218C7.50185 1.60462 7.20933 2.06183 7.01478 2.56287C6.82024 3.06391 6.72758 3.59872 6.74222 4.136C6.75096 4.83344 6.94306 5.5163 7.29922 6.116C7.65416 6.71469 8.16092 7.20902 8.76822 7.549C11.2272 9.105 12.9382 12.08 12.9382 15.006C12.9322 17.1592 12.1086 19.2298 10.6342 20.799L8.77422 22.451C8.16722 22.79 7.66022 23.284 7.30422 23.884C6.94722 24.483 6.75622 25.167 6.74722 25.865C6.73193 26.4022 6.82429 26.9371 7.01887 27.438C7.21346 27.939 7.50632 28.396 7.88022 28.782C8.25266 29.1674 8.69889 29.4739 9.19232 29.6832C9.68575 29.8924 10.2163 30.0002 10.7522 30C11.2881 29.9994 11.8183 29.8913 12.3117 29.682C12.805 29.4728 13.2513 29.1668 13.6242 28.782C13.9974 28.3955 14.2899 27.9384 14.4844 27.4376Z"
              fill="#8DA2FB"
            />
            <path
              d="M19.9162 6.36C19.4752 5.698 19.2402 4.919 19.2402 4.123C19.2409 3.05673 19.6633 2.034 20.4152 1.278C21.069 0.62024 21.9313 0.210504 22.8542 0.119089C23.7771 0.0276751 24.7031 0.260281 25.4732 0.777001C26.1329 1.2199 26.6465 1.84836 26.9492 2.583C27.252 3.31848 27.331 4.12692 27.1764 4.9071C27.0218 5.68728 26.6405 6.40452 26.0802 6.969C25.5216 7.53193 24.808 7.91563 24.0303 8.07112C23.2527 8.22661 22.4463 8.14685 21.7142 7.842C20.9814 7.53685 20.3557 7.02107 19.9162 6.36Z"
              fill="#8DA2FB"
            />
            <path
              d="M21.0212 22.518C21.6802 22.076 22.4552 21.84 23.2472 21.84V21.838C23.7737 21.8386 24.2949 21.9432 24.7809 22.1457C25.2668 22.3482 25.7081 22.6446 26.0792 23.018C26.7352 23.6779 27.1432 24.544 27.2343 25.47C27.3254 26.3959 27.094 27.3249 26.5792 28.1C26.1398 28.762 25.5137 29.2785 24.7802 29.584C24.0481 29.8888 23.2418 29.9686 22.4641 29.8131C21.6865 29.6576 20.9728 29.2739 20.4142 28.711C19.8537 28.1464 19.4723 27.429 19.3177 26.6486C19.1631 25.8683 19.2423 25.0596 19.5452 24.324C19.848 23.5894 20.3616 22.9609 21.0212 22.518Z"
              fill="#8DA2FB"
            />
            <path
              d="M32.8242 12.758C33.2641 13.4198 33.4991 14.1974 33.4992 14.9931C33.4986 16.0597 33.0762 17.0827 32.3242 17.839C31.953 18.2122 31.5117 18.5086 31.0258 18.7111C30.5398 18.9136 30.0187 19.0182 29.4922 19.019C28.6994 19.019 27.9245 18.783 27.2662 18.341C26.6066 17.8981 26.0929 17.2696 25.7902 16.535C25.4873 15.7994 25.4081 14.9907 25.5627 14.2104C25.7173 13.43 26.0987 12.7126 26.6592 12.148C27.2179 11.5849 27.9317 11.2011 28.7096 11.0456C29.4874 10.8901 30.294 10.9699 31.0262 11.275C31.7592 11.5804 32.3849 12.0966 32.8242 12.758Z"
              fill="#8DA2FB"
            />
            <path
              d="M2.28026 11.647C2.93926 11.205 3.71326 10.969 4.50626 10.969C5.03261 10.9701 5.55357 11.075 6.03934 11.2776C6.52511 11.4803 6.96617 11.7767 7.33726 12.15C7.99287 12.8097 8.40068 13.6754 8.49178 14.601C8.58288 15.5265 8.35169 16.4552 7.83726 17.23C7.39793 17.8914 6.77217 18.4075 6.03926 18.713C5.3069 19.0164 4.50093 19.0953 3.72361 18.9399C2.94629 18.7845 2.23266 18.4017 1.67326 17.84C1.11296 17.2755 0.731653 16.5583 0.577076 15.7781C0.422498 14.9979 0.501526 14.1895 0.804262 13.454C1.10685 12.719 1.62048 12.0902 2.28026 11.647Z"
              fill="#8DA2FB"
            />
          </svg>
          <p className={styles.logoContent}>GREEN HOUSE</p>
        </div>
        <div className={styles.center}>
          <ul style={{ display: "flex", flexDirection: "column" }}>
            {MenuItem.map((item, index) =>
              item.content !== "task" ? (
                <Button key={index}>
                  <Link className={styles.menuItem} to={item.to}>
                    {item.icon}
                    {id === item.to ? (
                      <p
                        className={styles.itemContent}
                        style={{ color: "white" }}
                      >
                        {item.content}
                      </p>
                    ) : (
                      <p className={styles.itemContent}>{item.content}</p>
                    )}
                  </Link>
                </Button>
              ) : (
                item.render
              )
            )}
            <Button
              onClick={() => {
                localStorage.removeItem("userInfo");
                window.location.reload();
              }}
            >
              <Link className={styles.menuItem} to={"/"}>
                <LogoutIcon
                  sx={{
                    fontSize: "2.2rem",
                    color: "#8E92BC",
                    marginRight: "10px",
                  }}
                />
                <p className={styles.itemContent}>Log out</p>
              </Link>
            </Button>
          </ul>
        </div>
        <div className={styles.bottom}>
          <img
            className={styles.avatar}
            src="https://as01.epimg.net/meristation_en/imagenes/2022/09/16/news/1663350140_632920_1663350705_noticia_normal.jpg"
            alt="avatar"
          />
          <div className={styles.nameUser}>
            <p>Sơn Tùng</p>
            <p>tungson@mtp.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
