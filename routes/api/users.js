const express = require("express");
const router = express.Router();
const ctrlUsers = require("./controller-user");
const Joi = require("joi");
const userMiddleware = require("../../middlewares/user");

const userSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  subscription: Joi.string(),
});

const updateSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const validator = (schema) => (req, res, next) => {
  const body = req.body;
  const valid = schema.validate(body);
  if (valid.error) {
    res.status(400).json({ error: valid.error.details[0].message });
    return;
  }
  return next();
};

router.post("/register", validator(userSchema), ctrlUsers.registerUser);
router.post("/login", validator(userSchema), ctrlUsers.loginUser);
router.post("/logout", userMiddleware, ctrlUsers.logoutUser);

router.get("/current", userMiddleware, ctrlUsers.getCurrentUser);
router.patch(
  "/subscription",
  [userMiddleware, validator(updateSchema)],
  ctrlUsers.update
);

module.exports = router;
