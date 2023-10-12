import express from "express";
import contactController from "../../controllers/contactController.js";
import { isEmptyBody } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { contactsAddSchema } from "../../models/Contact.js";

const contactAddValidate = validateBody(contactsAddSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", contactController.getAllContacts);

contactsRouter.get("/:id", contactController.getContactById);

contactsRouter.post(
  "/",
  isEmptyBody,

  contactController.addContact
);

contactsRouter.delete("/:id", contactController.removeContact);

contactsRouter.put(
  "/:id",
  isEmptyBody,
  contactAddValidate,
  contactController.updateContact
);

export default contactsRouter;
