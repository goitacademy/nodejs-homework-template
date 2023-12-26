import express from "express";

import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";


const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:id', isValidId, contactsController.getByID);

contactsRouter.post('/', isEmptyBody, contactsController.add);

contactsRouter.put('/:id', isValidId, isEmptyBody, contactsController.updateByID);

contactsRouter.patch('/:id/favorite', isValidId, contactsController.updateFavorite);

contactsRouter.delete('/:id', isValidId, contactsController.deleteById);


export default contactsRouter;