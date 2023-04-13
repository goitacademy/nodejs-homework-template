const express = require("express");
const routerRegister = express.Router();

const {
  registerContact,
  listContact,
  checkEmail,
  checkUserById,
  checkUserByIdAndUpdate,
} = require("../../models/user");

const loginHandler = require("../../auth/loginHandler");
const { registrationSchema } = require("../../models/validation");

const auth = require("../../auth/auth");

routerRegister.post("/signup", async (req, res) => {
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

routerRegister.get("/signup", auth, async (req, res) => {
  try {
    const users = await listContact();
    res.status(200).json(users);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

routerRegister.get("/signup/email", auth, async (req, res) => {
  try {
    const { email } = req.body;

    const users = await checkEmail({ email: email });
    const payload = {
      id: users._id,
      email: users.email,
      subscription: users.subscription,
    };
    res.status(200).json(payload);
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

routerRegister.post("/login", async (req, res) => {
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

routerRegister.get("/logout", auth, async (req, res) => {
  const id = req.user.id;
  const token = req.headers.authorization.split(" ");
  const newToken = null;
  try {
    await checkUserByIdAndUpdate(id, { token: newToken });
    return res.status(204).send("No content");
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = routerRegister;
