const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../schemas/user");
require("dotenv").config();
const secret = process.env.SECRET;

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
    console.log(user);
    req.user = user;
    next();
  })(req, res, next);
};

const newAuth = async (req, res, next) => {
  const payload = req.headers.authorization.split("Bearer ")[1];
  const resultToken = jwt.verify(payload, "gh239g32hg");
  const [user] = await User.find({ _id: resultToken.id });
  if (payload !== user.token) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
  req.user = user;
  next();
};
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Incorrect login or password",
      data: "Bad request",
    });
  }

  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  const newUser = await User.findOneAndUpdate(
    { email },
    { token },
    { new: true }
  );
  res.json({
    status: "success",
    code: 200,
    data: newUser,
  });
});

router.post("/registration", async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    const newUser = new User({ username, email });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "Registration successful",
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/list", auth, (req, res, next) => {
  const { email, token } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      message: `Authorization was successful: ${email} ${token}`,
    },
  });
});

router.get("/logout", newAuth, async (req, res) => {
  const { email, id } = req.user;
  console.log(req.user);
  const logout = await User.findByIdAndUpdate(
    id,
    { token: null },
    { new: true }
  );
  console.log(logout);
  res.send({
    data: logout,
  });
});

router.get("/current", newAuth, async (req, res) => {
  const { email, subscription } = req.user;
  res.send({
    status: "success",
    ResponseBody: {
      email,
      subscription,
    },
  });
});

module.exports = router;
