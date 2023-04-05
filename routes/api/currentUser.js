const express = require("express");
const router = express.Router();
const currentUser = require("../../controllers/users");
const auth = require("../../auth/auth");

router.get("/current", auth, async (req, res) => {
  try {
    const { email } = req.user;
    const user = await currentUser.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
