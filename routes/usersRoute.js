const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const {
  userSignup,
  getUser,
  updateUser,
} = require("../controllers/usersControllers");
const { auth } = require("../auth/auth");
const { listContacts } = require("../controllers/contactsControllers");
const { Users } = require("../models/usersModel");

router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;

  const isInBase = await getUser("email", email);
  if (isInBase) {
    return res
      .status(409)
      .send({ message: "sorry, this email is already in use" });
  }
  try {
    const newUser = Users(req.body);
    newUser.setPassword(password);
    const response = await userSignup(newUser);
    return res
      .status(201)
      .send({ message: `signup succesfully! Welcome${response.email}` });
  } catch {
    return res.status(400).send({ message: "sorry, bad request" });
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await getUser("email", email);
  if (!user) {
    return res
      .status(409)
      .send({ message: "sorry, this email doesn't exist in our database" });
  }
  if (!user.validPassword(password) || user.email !== email) {
    return res.status(400).send({ message: "wrong password or email" });
  }
  try {
    const payload = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    await updateUser(payload.id, { token: token });
    return res
      .status(200)
      .send({ message: `succesfully logged in! Your token is: ${token}` });
  } catch {
    return res.status(400).send({ message: "Bad request" });
  }
});

router.get("/current", auth, async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const allContacts = await listContacts();
    const { id } = jwt.verify(token, secret);
    const filteredList = allContacts.filter(
      (el) => el.owner.toString() === id.toString()
    );
    return res.status(200).send({ message: filteredList });
  } catch {
    return res.status(400).send({ message: "Bad request" });
  }
});

router.post("/logout", auth, async (req, res, next) => {
  const token = req.headers.authorization;
  const user = await getUser("token", token);
  if (!user) {
    return res.status(400).send({ message: "Already logged out!" });
  }
  try {
    await updateUser(user._id, { token: null });
    return res.status(204).send();
  } catch {
    return res.status(401).send({ message: "Not authorized" });
  }
});

module.exports = router;
