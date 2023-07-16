const express = require("express");
const contactsRouter = express.Router();
const {
	getAllContactsCtrl,
	getContactByIdCtrl,
	addContactCtrl,
	updateContactCtrl,
	deleteContactCtrl,
} = require("../../controllers/contacts");
// const validateService = require("../../helpers/validation");

contactsRouter.get("/", getAllContactsCtrl);

contactsRouter.get("/:id", getContactByIdCtrl);

contactsRouter.post("/", addContactCtrl);

contactsRouter.put("/:id", updateContactCtrl);

contactsRouter.delete("/:id", deleteContactCtrl);


module.exports = contactsRouter;
