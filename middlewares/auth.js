import models from "../models/index.js";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { Unauthorized } = createError;
const { SECRET_KEY } = process.env;
const { userModel } = models;
const { User } = userModel;

export const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};
