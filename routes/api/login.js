const express = require("express");

const loginRouter = express.Router();

const loginHandler = require("../../auth/loginHandler");

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await loginHandler(email, password);
    if (result) {
      return res.status(200).send(`Hello ${email}`);
    } else {
      return res.status(401).send("Wrong user credentials");
    }
  } catch (err) {
    return res.status(404).send(err);
  }
});

module.exports = loginRouter;
