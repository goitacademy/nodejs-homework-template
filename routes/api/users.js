const express = require("express");
const authRouter = express.Router(); 

const authController = require('../../controllers/auth-controller');
const {authenticate}=require('../../middlewars/authenticate');

const { UserSignupSchema, 
    UserSigninSchema, 
    validateBody } = require('../../schemas/userSchema');

authRouter.post("/register", validateBody(UserSignupSchema), authController.register);

authRouter.post("/login", validateBody(UserSigninSchema), authController.login);

authRouter.get("/current", authenticate,  authController.current);

authRouter.post("/logout", authenticate,  authController.logout);

authRouter.patch("/updateSubscription", authenticate,  authController.updateSubscription);


module.exports = authRouter;



