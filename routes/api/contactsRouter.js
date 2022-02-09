const { Router } = require("express");
const router = Router();

const { authenticate } = require("../../src/middlewares");

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  changeContactController,
  patchContactController,
  deleteContactController,
} = require("../../src/controllers/contactsController");


router.get("/", authenticate, getContactsController);

router.get("/:contactId", authenticate, getContactByIdController);

router.post("/", authenticate, addContactController);

router.put("/:contactId", authenticate, changeContactController);

router.patch("/:contactId/favorite", authenticate, patchContactController);

router.delete("/:contactId", authenticate, deleteContactController);

module.exports = { contactsRouter: router };
