const express = require("express");

const ctrl = require("../../controllers/users");
const { validateBody, aunthenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.userJoiSchema), ctrl.register);

// signin
router.post("/login", validateBody(schemas.userJoiSchema), ctrl.login);

router.get("/current", aunthenticate, ctrl.getCurrent);

module.exports = router;
