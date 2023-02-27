import userRouter from "./userRoutes.js";
import dataRouter from "./dataRoutes.js";

const route = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/data", dataRouter);
};

export default route;
