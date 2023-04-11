const express = require("express");

const loginRouter = express.Router();

const loginHandler = require("../../auth/loginHandler");

const { registrationSchema } = require("../../models/validation");

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  const { error } = registrationSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const token = await loginHandler(email, password);
    if (token) {
      return res.status(200).send(token);
    } else {
      return res.status(401).send("Wrong user credentials");
    }
  } catch (err) {
    return res.status(404).send(err);
  }
});

module.exports = loginRouter;
