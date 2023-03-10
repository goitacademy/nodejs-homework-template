// -------------------------------------------------------------
//                    ROUTER AUTH  /user
// -------------------------------------------------------------
const express = require("express");
const ctrl = require("../../controllers/auth");
const { validateBody } = require("../../middlewares");
const { authSchema } = require("../../models/user");
const { authorization } = require("../../middlewares");

const router = express.Router();

router.post("/signup", validateBody(authSchema), ctrl.signup);
router.post("/login", validateBody(authSchema), ctrl.login);
router.post("/logout", authorization, ctrl.logout);
router.get("/current", authorization, ctrl.current);

module.exports = router;
