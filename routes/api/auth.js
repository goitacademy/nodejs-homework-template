const express = require("express");
const {
  register,
  login,
  logout,
  getCurrent,
} = require("../../controllers/auth.controller");
const { tryCatchWrapper } = require("../../helpers/index");
const { auth } = require("../../middleware/auth");
const validationBody = require("../../middleware/validationBody");
const { schemaAUTH } = require("../../schema/schema");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validationBody(schemaAUTH),
  tryCatchWrapper(register)
);
authRouter.post("/login", validationBody(schemaAUTH), tryCatchWrapper(login));
authRouter.post("/logout", tryCatchWrapper(auth), tryCatchWrapper(logout));
authRouter.post("/current", tryCatchWrapper(auth), tryCatchWrapper(getCurrent));

module.exports = authRouter;
