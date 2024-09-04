import express from "express";
import { User } from "../../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/users/signup", async (req, res, next) => {
  const { username, email, password } = req.body;

  const { error } = User.validate({ username, email, password });
  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: error.details[0].message,
    });
  }

  const user = await User.findOne({ email }).lean();
  if (user) {
    return res.status(409).json({
      status: "409 Conflict",
      code: 409,
      message: "Email in use",
      data: "Conflict",
    });
  }

  try {
    const newUser = new User({ username, email });
    await newUser.setPassword(password);
    await newUser.save();
    return res.status(201).json({
      statuss: "201 Created",
      code: 201,
      message: "Registration successfull",
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    console.error(
      `Błąd podczas rejestracji nowego użytkownika: ${error.message}`
    );
    next(error);
  }
});

router.post("/users/login", async (req, res, _next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      status: "400 Bad Request",
      code: 400,
      message: "Error",
    });
  }
  const isPasswordCorrect = await user.validatePassword(password);
  if (isPasswordCorrect) {
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1w" });

    user.token = token;
    await user.save();

    return res.status(200).json({
      status: "200 OK",
      code: 200,
      message: "Log in successfull",
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } else {
    return res.status(401).json({
      status: "401 Unauthorized",
      code: 401,
      message: "Email or password is wrong",
    });
  }
});

export default router;
