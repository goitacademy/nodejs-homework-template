const express = require("express");
const routerRegister = express.Router();

const {
  registerContact,
  listContact,
  checkEmail,
} = require("../../models/user");

const { registrationSchema } = require("../../models/validation");

const auth = require("../../auth/auth");
const { checkUserById } = require("../../models/user");

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

routerRegister.get("/", auth, async (req, res) => {
  try {
    const users = await listContact();
    res.status(200).json(users);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

routerRegister.get("/email", auth, async (req, res) => {
  try {
    const { email } = req.body;

    const users = await checkEmail({ email: email });
    res.status(200).json(users);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

routerRegister.get("/current", auth, async (req, res) => {
  try {
    const id = req.user.id;

    const users = await checkUserById(id);

    const payload = {
      email: users.email,
      subscription: users.subscription,
    };

    res.status(200).json(payload);
  } catch {
    return res.status(401).send("Not authorized");
  }
});

module.exports = routerRegister;
