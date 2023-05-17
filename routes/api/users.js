const express = require("express");
const router = express.Router();
const ctrlContact = require("../../controller");
const passport = require("passport");
const upload = require("../../upload");

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
        data: "Unauthorized",
      });
    }
    const authHeader = req.get("Authorization");
    const token = authHeader.split(" ")[1];
    if (token !== user.token) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

router.post("/signup", ctrlContact.createUser);

router.post("/login", ctrlContact.login);

router.get("/logout", auth, ctrlContact.logout);

router.get("/current", auth, ctrlContact.getUser);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlContact.updateAvatar
);

module.exports = { auth, router };
