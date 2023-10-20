const express = require("express");

const authRouter = express.Router();

const isEmptyBody = require("../../middlewares/isEmptyBody");

const { signup, login } = require("../../controllers/authControllers");

const { useValidationEmail } = require("../../auth/useValidationEmail");

authRouter.post("/register", useValidationEmail, isEmptyBody, signup);

authRouter.post("/login", isEmptyBody, login);

// authRouter.get("/", listContacts);

// authRouter.get("/:contactId", isValidId, getContactById);

// authRouter.post("/", addContact);

// authRouter.delete("/:contactId", isValidId, removeContact);

// authRouter.put("/:contactId", isValidId, updateContact);

// authRouter.patch("/:contactId/favorite", isValidId, updateStatusContact);

module.exports = authRouter;

