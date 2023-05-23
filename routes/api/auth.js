const express = require("express");
const User = require("../../models/user");
const router = express.Router();

const jsonParser = express.json();

router.post("/register", jsonParser, (req, res, next) => {
  User.create(req.body);
  console.log(req.bode);
  res.send("Register");
  next();
});

module.exports = router;
