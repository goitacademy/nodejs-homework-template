const express = require("express");
const User = require("../../models/user");
const router = express.Router();

const jsonParser = express.json();

router.post("/register", jsonParser, async (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const currentUser = await User.findOne({ email: newUser.email });
    if (currentUser === null) {
      return res.status(409).json({ message: "User alredy exist" });
    }
    User.create(newUser);
    return res.status(201).end();
  } catch (error) {
    return next(error.message);
  }
});

module.exports = router;
