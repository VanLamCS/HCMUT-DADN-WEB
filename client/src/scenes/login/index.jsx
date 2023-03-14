import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { loginUser } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ reload, setReload }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = { email, password };
    const { data } = await loginUser(form);
    if (data) {
      toast.success("Login successfully!!!");
      localStorage.setItem("user", JSON.stringify(data));
      setReload(!reload);
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen__content}>
          <form onSubmit={handleSubmit} className={styles.login}>
            <div className={styles.login__field}>
              <i class={`${styles.login__icon} fas fa-user`}></i>
              <input
                type="text"
                className={styles.login__input}
                placeholder="User name / Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.login__field}>
              <i class={`${styles.login__icon} fas fa-lock`}></i>
              <input
                type="password"
                className={styles.login__input}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className={`${styles.button} ${styles.login__submit}`}
            >
              <span className={styles.button__text}>Log In Now</span>
              <i className={`${styles.button__icon} fas fa-chevron-right`}></i>
            </button>
          </form>
          <div className={styles.socialLogin}>
            <h3>LOG IN VIA</h3>
            <div className={styles.socialIcons}>
              <a
                href="#"
                className={`${styles.socialLogin__icon} fab fa-instagram`}
              ></a>
              <a
                href="#"
                className={`${styles.socialLogin__icon} fab fa-facebook`}
              ></a>
              <a
                href="#"
                className={`${styles.socialLogin__icon} fab fa-twitter`}
              ></a>
            </div>
          </div>
          <div className={styles.screen__background}>
            <span
              className={`${styles.screen__background__shape} ${styles.screen__background__shape4}`}
            ></span>
            <span
              className={`${styles.screen__background__shape} ${styles.screen__background__shape3}`}
            ></span>
            <span
              className={`${styles.screen__background__shape} ${styles.screen__background__shape2}`}
            ></span>
            <span
              className={`${styles.screen__background__shape} ${styles.screen__background__shape1}`}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
