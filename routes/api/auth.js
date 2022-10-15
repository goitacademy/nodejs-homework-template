const express = require('express');
const {validation, ctrlWrapper, authenticate} = require('../../middlewares');
const {schemas} =require("../../models/user");
const ctrl = require("../../controllers/auth")


const router = express.Router();

router.post("/singup", validation(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post("/login", validation(schemas.registerSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch("/", authenticate, validation(schemas.updateSubscriptionSchema), ctrlWrapper(ctrl.updateSubscription)
  );

module.exports = router;