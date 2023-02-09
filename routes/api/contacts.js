const express = require("express");

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactByIdController,
  changeContactByIdController,
} = require("../../controllers/contactsControllers");

const {
  addContactValidation,
  changeContactByIdValidation,
} = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.get("/", getContactsController);

router.get("/:id", getContactByIdController);

router.post("/", addContactValidation, addContactController);

router.delete("/:id", deleteContactByIdController);

router.put("/:id", changeContactByIdValidation, changeContactByIdController);

module.exports = { contactsRouter: router };
