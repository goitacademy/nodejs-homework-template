const express = require("express");

const { registration, login, logout } = require("../../../controllers/auth");
const { wrapper: wrapperError } = require("../../../middleware/error-handler");
// const { guard } = require("../../../middleware/guard");
const router = express.Router();

router.post("/registration", wrapperError(registration));
router.post("/login", wrapperError(login));
router.post("/logout", wrapperError(logout));

module.exports = router;
