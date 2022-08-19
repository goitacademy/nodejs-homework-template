const express = require("express");
const { addUser, loginUser, logOut, getUser } = require("../../models/users");
const { addUserSchema } = require("../../models/usersSchema");
const { validation } = require("../../middlewares/validation");
const { authMW } = require("../../middlewares/authMW");

const router = express.Router();

router.post("/signup", validation(addUserSchema), async (req, res) => {
  try {
    const user = await addUser(req.body);
    res.status(201).json({ user });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/login", validation(addUserSchema), async (req, res) => {
  try {
    const user = await loginUser(req.body);
    res.status(201).json({ user });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.get("/logout", authMW, async (req, res) => {
  try {
    await logOut(req.userId);
    res.status(204).json({ message: "No Content" });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.get("/current", authMW, async (req, res) => {
  try {
    const user = await getUser(req.userId);
    res.status(200).json({ user });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
