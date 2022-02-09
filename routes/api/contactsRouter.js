const { Router } = require("express");
const router = Router();

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  changeContactController,
  patchContactController,
  deleteContactController,
} = require("../../src/controllers/contactsController");

router.get("/", getContactsController);

router.get("/:contactId", getContactByIdController);

router.post("/", addContactController);

router.put("/:contactId", changeContactController);

router.patch("/:contactId/favorite", patchContactController);

router.delete("/:contactId", deleteContactController);

module.exports = { contactsRouter: router };
