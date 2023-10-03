import express from "express";
import contactController from "../../controllers/contacts.js";
import { idNotFound, validateBody } from "../../decorators/index.js";
import contactService from "../../models/contacts.js";
import contactSchema from "../../schemas/contact-schema.js";

const isIdExists = contactService
  .listContacts()
  .then((data) => idNotFound(data));
const isValidate = validateBody(contactSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", contactController.getAll);

contactsRouter.get("/:contactId", isIdExists, contactController.getById);

contactsRouter.post("/", isValidate, contactController.add);

contactsRouter.delete("/:contactId", isIdExists, contactController.deleteById);

contactsRouter.put(
  "/:contactId",
  isIdExists,
  isValidate,
  contactController.updateById
);

export default contactsRouter;
