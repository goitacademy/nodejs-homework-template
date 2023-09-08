import express from "express";
import contactsController from ".
import contactValidation from "../../middleware/validation/contact-validation.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", contactsController.getById);

contactsRouter.post("/", contactValidation.addContactValidate, contactsController.add);

contactsRouter.delete("/:contactId", contactsController.deleteById);

contactsRouter.put(
  "/:contactId",
  contactValidation.addContactValidate,
  contactsController.update
);

export default contactsRouter;
