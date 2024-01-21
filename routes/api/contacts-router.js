import express from "express";

import contactsControllers from "../../controllers/contacts-controllers.js";

import { authenticate, isEmptyBody, isValidId, isEmptyBodyFavorite } from "../../middlewares/index.js";




const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', contactsControllers.getAll);

contactsRouter.get('/:id', isValidId, contactsControllers.getById);

contactsRouter.post('/', isEmptyBody, contactsControllers.add);

contactsRouter.put('/:id',isValidId, isEmptyBody, contactsControllers.updateById);

contactsRouter.delete('/:id', isValidId, contactsControllers.deleteById);

contactsRouter.patch('/:id/favorite', isValidId, isEmptyBodyFavorite, contactsControllers.updateStatusContact);

export default contactsRouter;
