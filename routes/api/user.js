const express = require("express");
const routerRegister = express.Router();

const {
  registerContact,
  listContact,
  checkEmail,
} = require("../../models/user");

const { registrationSchema } = require("../../models/validation");

routerRegister.post("/", async (req, res) => {
  const { error } = registrationSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { email } = req.body;
  const users = await checkEmail({ email: email });
  if (users !== null) {
    return res.status(400).send("Email in use");
  }

  try {
    const { email, password } = req.body;
    const user = await registerContact(email, password);
    return res.status(201).json(user);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

routerRegister.get("/", async (req, res) => {
  try {
    const users = await listContact();
    res.status(200).json(users);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

routerRegister.get("/email", async (req, res) => {
  try {
    const { email } = req.body;

    const users = await checkEmail({ email: email });
    res.status(200).json(users);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

module.exports = routerRegister;
