import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";
const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.listContacts);

contactsRouter.get("/:id", contactsController.getContactById);

contactsRouter.post("/", isEmptyBody, contactsController.addContact);

contactsRouter.delete("/:id", contactsController.removeContact);

contactsRouter.put("/:id", isEmptyBody, contactsController.updateById);

export default contactsRouter;
