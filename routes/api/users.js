const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const usersRouter = express.Router();

dotenv.config();
const secret = process.env.SECRET_WORD;

const users = require("../../models/users");
const auth = require("../../config/passport");

usersRouter.get("/current", auth, async (req, res, next) => {
  const { id: userId } = req.user;
  try {
    const user = await users.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: "Error! User not found!" });
    }
    const { email, subscription } = user;
    return res.status(200).json({
      status: "success",
      code: 200,
      data: { email, subscription },
    });
  } catch (err) {
    res.status(500).json(`An error occurred while getting the contact: ${err}`);
  }
});

usersRouter.post("/signup", async (req, res, next) => {
  const { body } = req;

  if (Object.keys(body).length === 0) {
    return res
      .status(400)
      .json("Error! Missing fields! Empty request is not allowed");
  }

  try {
    const user = await users.addUser(body);
    if (user === 409) {
      return res.status(409).json({ message: "Email in use" });
    }
    const { email, subscription } = user;
    return res.status(201).json({
      status: "success",
      code: 201,
      user: { email, subscription },
    });
  } catch (err) {
    res.status(500).json(`An error occurred while adding the user: ${err}`);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { body } = req;

  if (Object.keys(body).length === 0) {
    return res
      .status(400)
      .json("Error! Missing fields! Empty request is not allowed");
  }

  try {
    const user = await users.loginUser(body);

    if (!user) {
      return res.status(400).json(`Error! Email or password is wrong!`);
    }

    const payload = {
      id: user.id,
      username: user.email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "2h" });

    user.token = token;
    await user.save();

    const { email, subscription } = user;

    res.status(200).json({
      status: "success",
      code: 200,
      token: token,
      user: { email, subscription },
    });
  } catch (err) {
    res.status(500).json(`An error occurred while adding the user: ${err}`);
  }
});

usersRouter.post("/logout", auth, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await users.getUser(userId);

    if (!user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
      });
    }

    user.token = null;
    await user.save();

    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "An error occurred during logout.",
    });
  }
});

usersRouter.patch("/", auth, async (req, res, next) => {
  const { id: userId } = req.user;
  const { body } = req;
  const { subscription } = body;

  if (!("subscription" in body) || Object.keys(body).length === 0) {
    return res.status(400).json("Error! Missing field subscription!");
  }

  try {
    const updatedStatus = await users.patchUser(subscription, userId);
    if (updatedStatus === 400) {
      return res.status(400).json("Error! Invalid subscription type!");
    }
    return res.json({
      status: "success",
      code: 200,
      data: { updatedStatus },
    });
  } catch (err) {
    res
      .status(500)
      .json(`An error occurred while updating the contact: ${err}`);
  }
});

module.exports = usersRouter;
