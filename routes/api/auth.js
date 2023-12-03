// routes\api\auth.js
const express = require("express");
const controller = require("../../controllers/auth");
const validateSchemas = require("../../middlewares/validateSchemas");
const { ensureAuthenticated } = require("../../middlewares/validateJWT");
const schemasJoi = require("../../models/schemas");

const authRouter = express.Router();

module.exports = () => {
  authRouter.get("/current", ensureAuthenticated, controller.current);

  authRouter.get("/verify/:verificationToken", controller.verifyUser);

  authRouter.post(
    "/signup",
    validateSchemas(schemasJoi.registerUserSchema, "body"),
    controller.signup
  );

  authRouter.post(
    "/log-in",
    validateSchemas(schemasJoi.loginSchema, "body"),
    controller.login
  );

  authRouter.patch("/logout/:id?", ensureAuthenticated, controller.logout);

  // auth cambai
  authRouter.patch(
    "/:id/subscription",
    ensureAuthenticated,
    controller.updateContactSubscription
  );

  return authRouter;
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
