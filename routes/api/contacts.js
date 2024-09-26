import express from "express";

import contactController from "../../controllers/contacts.js";

import { authenticate, isEmptyBody, isValidId } from "../../middlewares/index.js";

import { validateBody } from "../../middlewares/index.js";

import { contactAddSchema, contactUpdateFavoriteSchema } from "../../models/contact.js";

const contactAddValidate = validateBody(contactAddSchema);

const contactUpdateFavoriteValidate = validateBody(contactUpdateFavoriteSchema);

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', contactController.getAll);

contactsRouter.get('/:contactId', isValidId , contactController.getById);

contactsRouter.post('/', isEmptyBody, contactAddValidate, contactController.add);

contactsRouter.delete('/:contactId', isValidId, contactController.deleteById);

contactsRouter.put('/:contactId', isValidId, isEmptyBody, contactAddValidate, contactController.updateById);

contactsRouter.patch('/:contactId/favorite', isValidId, contactUpdateFavoriteValidate, contactController.updateStatusContact);



export default contactsRouter;