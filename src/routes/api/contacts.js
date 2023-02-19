const express = require("express");
const contactsRouter = express.Router();
// const { contactValidation } = require("../../middlewares/validationMiddleware");
const {
	getAllContacts,
} = require("../../controllers/getAllContactsController");
const {
	getOneContactById,
} = require("../../controllers/getOneContactByIdController");
const { addNewContact } = require("../../controllers/addNewContactController");
const {
	removeContactById,
} = require("../../controllers/removeContactByIdController");
const {
	changeContactById,
} = require("../../controllers/changeContactByIdController");
const {
	changeStatusContact,
} = require("../../controllers/changeStatusContactByIdController");

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:contactId", getOneContactById);

contactsRouter.post("/", addNewContact);

contactsRouter.delete("/:contactId", removeContactById);

contactsRouter.put("/:contactId", changeContactById);

contactsRouter.patch("/:contactId/favorite", changeStatusContact);

module.exports = contactsRouter;
