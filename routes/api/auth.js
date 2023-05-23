const express = require("express");

const router = express.Router();

router.post("/register", (req, res, next) => {
  res.send("Register");
  next();
});

module.exports = router;
