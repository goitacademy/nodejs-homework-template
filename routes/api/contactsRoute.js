import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAllContacts);
contactsRouter.get("/:id", contactsController.getContactById);
contactsRouter.post("/", isEmptyBody, contactsController.addContacts);
contactsRouter.put("/:id", isEmptyBody, contactsController.updateContactsById);
contactsRouter.delete("/:id", contactsController.delContactsById);

export default contactsRouter;
