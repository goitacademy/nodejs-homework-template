import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";
import { getUserById } from "../models/users.js";
import Users from "../service/schemas/users.js";

dotenv.config();
const secret = process.env.JWT_SECRET;

const usersRouter = express.Router();

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserById(email);
  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Incorrect email or password",
      data: "bad request",
    });
  }
  const payload = {
    id: user.id,
    username: user.username,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  res.json({
    status: "success",
    code: 200,
    data: { token },
  });
});

usersRouter.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await getUserById(email);
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    const newUser = new Users({ username, email });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "User created successfully",
      },
    });
  } catch (err) {
    next(err);
  }
});

usersRouter.get("/list", auth, async (req, res) => {
  const { username } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      message: `Authorization was successful: ${username}`,
    },
  });
});
export default usersRouter;
