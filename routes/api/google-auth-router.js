import express from "express";

import googleAuthController from "../../controllers/google-auth-controller.js";


const googleAuthRouter = express.Router();

googleAuthRouter.get('/google', googleAuthController.googleAuth);
googleAuthRouter.get('/google-redirect', googleAuthController.googleRedirect);


export default googleAuthRouter;