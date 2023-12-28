import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import { isEmptyBody, isValidId, isEmptyBodyFavorite } from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:contactId', isValidId,  contactsController.getById);

contactsRouter.post('/', isEmptyBody, contactsController.add);

contactsRouter.delete('/:contactId',isValidId, contactsController.deleteById);

contactsRouter.put('/:contactId', isValidId, isEmptyBody, contactsController.updateById);
 
contactsRouter.patch('/:contactId/favorite', isValidId, isEmptyBodyFavorite, contactsController.updateStatusContact);

 export default contactsRouter;