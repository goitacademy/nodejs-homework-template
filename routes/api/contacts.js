import express from "express";
import contactsControllers from "../../controllers/contacts-controllers.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.listContacts);

contactsRouter.get("/:id", contactsControllers.getContactById);

contactsRouter.post("/", isEmptyBody, contactsControllers.addContact);

contactsRouter.put("/:id", isEmptyBody, contactsControllers.updateContact);

contactsRouter.delete("/:id", contactsControllers.removeContact);

export default contactsRouter;
