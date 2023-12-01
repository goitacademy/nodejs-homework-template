import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.allContacts);
contactsRouter.get("/:id", contactsController.getContactById);
contactsRouter.post("/", isEmptyBody, contactsController.add);
contactsRouter.put("/:id", isEmptyBody, contactsController.updateById);
contactsRouter.delete("/:id", contactsController.removeContact);

export default contactsRouter;
