const express = require("express");
require("dotenv").config();

const router = express.Router();

const { User, userValidationSchema } = require("../../models/user");
const { createUser } = require("../../controllers/users");

router.post("/signup", async (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);
  const { email, password } = req.body;
  if (error) {
    return res.status(409).json(error.details[0].message);
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email id already in use",
      data: "Conflict",
    });
  }

  try {
    const user = await createUser(email, password);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send("Something went wrong");
  }
});

module.exports = router;
