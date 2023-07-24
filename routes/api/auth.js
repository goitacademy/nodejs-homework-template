const express = require("express");

const router = express.Router();
const ctrl = require("../../Controllers/auth");

const validate = require("../../Middlewares/validateUser");

const { schemas } = require("../../Service/schemas/users");

const validateToken = require("../../Middlewares/validateToken");

router.post("/register", validate(schemas.registerSchema), ctrl.register);

router.get("/login", validate(schemas.registerSchema), ctrl.login);

router.post("/logout", validateToken, ctrl.logout);

router.get("/current", validateToken, ctrl.currentUser);

router.patch("/subscription",
   validateToken,
  ctrl.updateSubscription);

module.exports = router;
