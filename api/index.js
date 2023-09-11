const express = require("express");
const router = express.Router();
const User = require("../service/schemas/user");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const ctrlContact = require("../controller");
require("dotenv").config();
const secret = process.env.SECRET;

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

router.post("/users/signup", async (req, res, next) => {
  const { email, password } = req.body;
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
    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Registration successful",
      user: { email, subscription: newUser.subscription },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/users/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Email or password is wrong",
    });
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  await User.findByIdAndUpdate(
    { _id: user.id },
    { $set: { token } },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    code: 200,
    token,
    user: { email: user.email, subscription: user.subscription },
  });
});

router.get("/users/logout", auth, async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id });

  if (!user) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Not autorized",
    });
  }

  await User.findByIdAndUpdate(
    { _id: req.user.id },
    { $set: { token: null } },
    { new: true }
  );

  res.status(204).json({
    status: "success",
    code: 204,
  });
});

router.get("/users/current", auth, async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id });

  if (!user) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Not autorized",
    });
  }

  res.status(200).json({
    status: "success",
    code: 200,
    user: { email: req.user.email, subscription: req.user.subscription },
  });
});

// router.post("/users/signup", ctrlUser.create);

// router.post("/users/login", ctrlUser.authenticate);

// router.get("/users/logout", auth, ctrlUser.logout);

// router.get("/users/current", auth, ctrlUser.getCurrent);

router.get("/contacts", auth, ctrlContact.get);

router.get("/contacts/:id", auth, ctrlContact.getById);

router.post("/contacts", auth, ctrlContact.create);

router.put("/contacts/:id", auth, ctrlContact.update);

router.delete("/contacts/:id", auth, ctrlContact.remove);

router.patch("/contacts/:id/favorite", auth, ctrlContact.updateFavorite);

module.exports = router;
