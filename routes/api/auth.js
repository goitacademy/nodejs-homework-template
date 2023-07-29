const express = require("express");


const { registerSchema, loginSchema, subscriptionSchema } = require("../../models/user");

const { validation, ctrlWrapper, authenticate, isValid, validationSubscrBody} = require("../../middlewares");

const { register, login, getCurrent, logout, updateSubscriptionUser } = require("../../controllers");


const router = express.Router();


router.post("/register", validation(registerSchema), ctrlWrapper(register));

router.post("/login", validation(loginSchema), ctrlWrapper(login));

router.get("/current", authenticate, ctrlWrapper(getCurrent));

router.post("/logout", authenticate, ctrlWrapper(logout));

router.patch("/:id/subscription", isValid, validationSubscrBody(subscriptionSchema), ctrlWrapper(updateSubscriptionUser))


module.exports = router;
