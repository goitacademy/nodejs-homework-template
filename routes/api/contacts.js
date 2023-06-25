const { Router } = require("express");
const {
  getAllContacts,
  getContact,
  saveNewContact,
  deleteContact,
  changeContact,
  updateStatusContact,
} = require("../../controller/controller.js");

const contactsRouter = Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:contactId", getContact);

contactsRouter.post("/", saveNewContact);

contactsRouter.delete("/:contactId", deleteContact);

contactsRouter.put("/:contactId", changeContact);

contactsRouter.patch("/:contactId/favorite", updateStatusContact);

module.exports = contactsRouter;
