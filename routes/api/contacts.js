const express = require("express");
const contactsRouter = express.Router();
const {
	getAllContactsCtrl,
	getContactByIdCtrl,
	addContactCtrl,
	updateContactCtrl,
	deleteContactCtrl,
} = require("../../controllers/contacts");

const {validation} = require("../../middlewares");
const { contactsSchema } = require("../../schemas")

const validateMiddleWare = validation(contactsSchema)

contactsRouter.get("/", getAllContactsCtrl);

contactsRouter.get("/:id", getContactByIdCtrl);

contactsRouter.post("/", validateMiddleWare, addContactCtrl);

contactsRouter.put("/:id", validateMiddleWare, updateContactCtrl);

contactsRouter.delete("/:id", deleteContactCtrl);


module.exports = contactsRouter;
