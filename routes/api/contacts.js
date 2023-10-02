import express from "express";
import {contactAddSchema} from "../../utils/validation/contactValidationSchemas.js";
import contactsController from "../../controllers/contactControllers.js";
import validateBody from "../../utils/validation/validateBody.js";

const contactAddValidate = validateBody(contactAddSchema);

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:contactId', contactsController.getById)

contactsRouter.post('/', contactAddValidate, contactsController.add)

contactsRouter.delete('/:contactId', contactsController.deleteById)

contactsRouter.put('/:contactId', contactAddValidate, contactsController.updateById)

export default contactsRouter;

