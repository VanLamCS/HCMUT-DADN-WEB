import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const verifyToken = async (req, res, next) => {
  let token = null;
  if (
    req.header("Authorization") &&
    req.header("Authorization").startsWith("Bearer")
  ) {
    token = req.header("Authorization").split(" ")[1];
    if (!token) {
      res.status(401);
      next(new Error("You are not authenticated"));
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decode) => {
      if (err) {
        res.status(403);
        return next(err);
      }
      req.user = await User.findById(decode.userId).select("-password");
      next();
    });
  }
  if (!token) {
    res.status(401);
    next(new Error("You are not authenticated"));
  }
};
