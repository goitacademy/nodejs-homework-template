const express = require("express");
const authenticate = require("../../middlewares/authorize");
const {
  catchRegErrors,
  catchLogErrors,
  catchErrors,
} = require("../../middlewares/catch-errors");
const { postAuthValidation } = require("../../middlewares/validationSchema");
const router = express.Router();

const { signupUser, loginUser, findOneUser } = require("../../models/users");

router.post(
  "/signup",
  postAuthValidation,
  catchRegErrors(async (req, res, next) => {
    const user = await signupUser(req.body);
    res.status(201).json({
      contentType: "application/json",
      ResponseBody: { user },
    });
  })
);
router.post(
  "/login",
  postAuthValidation,
  catchLogErrors(async (req, res, next) => {
    const { token, email, subscription } = await loginUser(req.body);
    res.status(201).json({
      contentType: "application/json",
      ResponseBody: {
        user: {
          email: email,
          subscription: subscription,
        },
        token: token,
      },
    });
  })
);

router.get(
  "/logout",
  authenticate,
  catchErrors(async (req, res, next) => {
    const userItem = await findOneUser(req.user.token);
    userItem.token = null;
    res.sendStatus(204);
  })
);

router.get(
  "/current",
  authenticate,
  catchErrors(async (req, res, next) => {
    const user = await findOneUser(req.user.token);
    res.status(200).send(user);
  })
);

module.exports = router;
