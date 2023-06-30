const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Contact = require("../../models/contact");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const secret = process.env.SECRET;

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.json({
      status: "error",
      code: 400,
      data: "Bad request",
      message: "Incorrect login/password",
    });
  }

  const payload = {
    id: user.id,
    email: user.email,
    password: user.password,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  const decoded = jwt.verify(token, secret);
  console.log(decoded);

  user.token = token;
  await user.save();

  res.json({
    status: "succes",
    code: 200,
    data: {
      token,
    },
  });
});

router.post("/register", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (user) {
    res.json({
      status: "error",
      code: 409,
      data: "Conflict",
      message: "User already exist!",
    });
  }
  try {
    const newUser = await new User({ email });

    console.log(password);

    newUser.setPassword(password);

    await newUser.save();

    res.json({
      status: "success",
      code: 201,
      user: {
        email: email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", async (req, res, next) => {

    const getTokenFromRequest = (req) => {
        const authHeader = req.headers.authorization;
      
        if (authHeader && authHeader.startsWith("Bearer ")) {
          // Extract the token from the "Authorization" header
          const token = authHeader.slice(7);
          return token;
        }
      
        // If no valid token is found, return null or handle the error as needed
        return null;
      };

      const token = getTokenFromRequest(req);

  try {
    const user = await User.findOne({ token });

    user.token = null;
   await user.save();
    res.json({
      status: "success",
      code: 200,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.json({
      status: "unauthorized",
      code: 401,
      message: "Not authorized",
    });
  }
});

router.get("/current", async (req, res, next) => {
  try {
    res.json({
      status: "ok",
      code: 200,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.json({
      status: "unauthorized",
      code: 401,
      message: "Not authorized",
    });
  }
});

module.exports = router;
