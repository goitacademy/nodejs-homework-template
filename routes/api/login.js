const express = require("express");
const loginHandler = require("../../auth/loginHandler");

// const { User } = require("../../controllers/users");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  // const user = await User.findOne({ email });

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Incorrect login or password",
      data: "Bad request",
    });
  }

  try {
    const token = await loginHandler(email, password);

    return res.status(200).send(token);
  } catch (err) {
    return res.status(401).send(err);
  }
});

module.exports = router;
