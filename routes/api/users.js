// routes\api\users.js
const express = require("express");
const controller = require("../../controllers/auth");
// const validateSchemas = require('../../middlewares/validateSchemas')
const { ensureAuthenticated } = require("../../middlewares/validateJWT");
// const schemasJoi = require('../../models/schemas')
const { upload } = require("../../middlewares/multerMiddleware");

const userRouter = express.Router();

module.exports = () => {
  userRouter.get("/verify", controller.verifyUserEmail);

  userRouter.get("/verify/:verificationToken", controller.verifyUser);

  userRouter.patch(
    "/avatars/",
    ensureAuthenticated,
    upload.single("avatar"),
    controller.updateAvatar
  );

  return userRouter;
};
    
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     summary: Register a new user
 *     description: Register a new user in the App.
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: User registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/SchemaSignIn'
 *     responses:
 *       201:
 *           description: User registration successful
 *           content:
 *             application/json:
 *               example:
 *                 result: { "user": { "_id": "123", "name": "John Doe", "email": "john@example.com" }, "token": "jwt-token" }
 *                 message: "Signup successfully."
 *       400:
 *           description: Bad request or email in use
 *           content:
 *             application/json:
 *               example:
 *                 result: null
 *                 message: "Email in use (or other error message)"
 *       500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               example:
 *                 result: null
 *                 message: "Internal server error"
 */
