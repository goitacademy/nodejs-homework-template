const express = require("express");

const ctrl = require("../../controllers/auth"); 

const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user")

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.registrerSchema), ctrlWrapper(ctrl.register));

// signin
router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login))

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent))

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout))


module.exports = router;