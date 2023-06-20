const express = require("express");
const User = require("../../models/users.model");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
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

router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (user) {
    res.json({
      status: "error",
      code: 409,
      data: `Conflict`,
      message: "User already exists!",
    });
  }
  try {
    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();
    res.json({
      status: "succress",
      code: 201,
      data: {
        message: "Register complete!",
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.json({
      status: "error",
      code: 400,
      data: "Incorrect login/password",
      message: "User already exists!",
    });
  }

  const payload = {
    id: user.id,
  };
  const secret = "testsecret";
  const token = jwt.sign(payload, secret);

  user.token = token;
  await user.save();

  return res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
});

router.get("/logout", async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.id;

    await User.findByIdAndUpdate(userId, { $unset: { authToken: 1 } });
    res.json({
      status: "success",
      code: 200,
      data: {
        message: "Logout successful!",
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/current", auth, async (req, res, next) => {
  const users = await User.find();
  res.json({
    status: "success",
    code: 200,
    data: {
      users: users || [],
    },
  });
});

module.exports = router;
