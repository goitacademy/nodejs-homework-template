const express = require("express");
const Joi = require("joi");
const {
  signup,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
} = require("../../models/users");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const uploads = require("../../middlewares/uploads");

const signupAndLoginSchema = Joi.object({
  email: Joi.string().email({ tlds: { deny: ["ru"] } }),
  password: Joi.string().required().min(4),
});

const validator = (schema) => (req, res, next) => {
  const body = req.body;
  const validation = schema.validate(body);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }

  return next();
};

const router = express.Router();

router.post("/signup", validator(signupAndLoginSchema), signup);
router.post("/login", validator(signupAndLoginSchema), login);
router.get("/logout", authMiddleware, logout);
router.get("/current", authMiddleware, getCurrentUser);
router.patch("/subscription", authMiddleware, updateSubscription);
router.patch(
  "/avatars",
  authMiddleware,
  uploads.single("avatar"),
  updateAvatar
);

module.exports = router;
