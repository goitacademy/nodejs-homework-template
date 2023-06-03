const express = require("express");
// const jwt = require('jsonwebtoken');
const router = express.Router();
const validateBody = require("../../decorators/validateBody");
const User = require("../../models/user-model");
const newUserSchema = require("../../schemas/users-schemas");

router.post("/register", validateBody(newUserSchema), (req, res, next) => {
  const user = req.body;

  User.create(user);
  res.status(201).send("User created").end();
});

module.exports = router;
