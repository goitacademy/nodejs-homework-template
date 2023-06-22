const express = require("express");
const { userValidator } = require("../../utils/validator");

const router = express.Router();

router.post("/users/register", userValidator, async (req, res, next) => {
  res.json(req.body);
});

module.exports = router;
