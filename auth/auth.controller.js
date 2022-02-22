const { Router } = require("express");
// const { validateSignUpSchema } = require("../../middleware/validate");
const { validateSignUpSchema } = require("./auth.schemas");
// const {} = require("");
const { AuthService } = require("./auth.service");

const authRouter = Router();

authRouter.post("/", validateSignUpSchema, async (req, res, next) => {
  const user = await AuthService.signUp(req.body);
  res.json(user);
});

exports.authRouter = authRouter;
