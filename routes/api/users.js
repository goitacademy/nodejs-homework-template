const express = require("express");
const router = express.Router();

const functions = require("../../controller/userController");
const { isAuthorized } = require("../../middleware/auth");
const {
  schemaUser,
  schemaSubscription,
} = require("../../validation/validation.js");

router.post("/signup", async (req, res, next) => {
  const validationResult = schemaUser.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.details[0].message,
    });
  }
  const user = await functions.signUp(req.body);
  if (!user) {
    return res.status(409).json({ message: "Email in use" });
  }
  return res.status(201).send({
    email: user.email,
    token: user.token,
    subscription: user.subscription,
  });
});

router.post("/login", async (req, res, next) => {
  const validationResult = schemaUser.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.details[0].message,
    });
  }
  const user = await functions.signIn(req.body);
  if (!user) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }
  return res.status(200).send({
    email: user.email,
    token: user.token,
    subscription: user.subscription,
  });
});

router.get("/logout", isAuthorized, async (req, res, next) => {
  await functions.logout(req.user._id);
  return res.status(204).send({});
});

router.get("/current", isAuthorized, async (req, res, next) => {
  return res.status(200).send({
    email: req.user.email,
    subscription: req.user.subscription,
  });
});

router.patch("/", isAuthorized, async (req, res, next) => {
  const validationResult = schemaSubscription.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.details[0].message,
    });
  }
  const user = await functions.updateSubscription(
    req.user._id,
    req.body.subscription
  );
  return res.status(200).send({
    email: user.email,
    subscription: user.subscription,
  });
});

module.exports = router;
