import express from "express";

import contactsControllers from "../../controllers/contacts-controllers.js";

import contactsValidation from "../../middleware/validation/contacts-validation.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAll);

contactsRouter.get("/:id", contactsControllers.getByID);

contactsRouter.post("/", contactsValidation.addContactsValidate, contactsControllers.add);

contactsRouter.put("/:id", contactsValidation.updateContactsValidate, contactsControllers.updateById);

contactsRouter.delete("/:id", contactsControllers.deleteById);

export default contactsRouter;
