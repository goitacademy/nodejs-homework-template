import express from "express";
import contactsControllers from "../../controllers/contacts-controllers.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.listContacts);

contactsRouter.get("/:id", isValidId, contactsControllers.getContactById);

contactsRouter.post("/", isEmptyBody, contactsControllers.addContact);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  contactsControllers.patchContact
);
contactsRouter.delete("/:id", isValidId, contactsControllers.removeContact);

export default contactsRouter;
