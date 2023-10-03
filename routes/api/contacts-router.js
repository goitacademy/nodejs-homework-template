import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import contactSchema from "../../schema/contact-schema.js"

import {validateBody} from "../../decorators/index.js";

import {isValidId} from "../../middlewara/index.js";

const contactAddValidate = validateBody(contactSchema.contactAddSchema);

const contactUpdateFavoriteValidate = validateBody(contactSchema.contactUpdateFavoriteSchema);

const contactRouter = express.Router()

contactRouter.get('/', contactsController.getAll);

contactRouter.get('/:id', isValidId, contactsController.getById);

contactRouter.post('/', contactAddValidate, contactsController.add);

contactRouter.put('/:id', isValidId, contactAddValidate, contactsController.updateById);

contactRouter.patch('/:id/favorite', isValidId, contactUpdateFavoriteValidate, contactsController.updateStatusContact);
 
contactRouter.delete('/:id', contactsController.deleteById);


export default contactRouter;
