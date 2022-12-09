const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getCurrent,
  logout,
} = require("../../controllers/auth.controller");

const { validationBody } = require("../../middlewares/validationBody.js");
const validationToken = require("../../middlewares/validationToken.js");
const { schemaAuth } = require("../../schema/validationSchema");

const { asyncWrapper } = require("../../helpers/api.helpers");

router.post("/signup", validationBody(schemaAuth), asyncWrapper(register));
router.post("/login", validationBody(schemaAuth), asyncWrapper(login));
router.get("/current", validationToken, asyncWrapper(getCurrent));
router.get("/logout", validationToken, asyncWrapper(logout));

module.exports = router;
