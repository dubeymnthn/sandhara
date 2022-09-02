import jwt from "jsonwebtoken";
import expressasyncHandler from "express-async-handler";
import User from "../models/userModels.js";

const protect = expressasyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.decode(token, " " + process.env.JWT_KEY);
      if (decoded === null) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      } else {
        req.user = await User.findById(decoded.id).select("-password");
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized ,no token");
  }
});
const admin = (req, res, next) => {
  if (req.user && req.user.isadmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an Admin");
  }
};

export { protect, admin };
