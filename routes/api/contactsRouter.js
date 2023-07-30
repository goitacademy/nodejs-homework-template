import express from "express";
import contactsControllers from "../../controllers/contacts-controllers.js";
import contactsSchemas from "../../schemas/contactsSchemas.js";
import  validateBody  from "../../decorators/validateBody.js";
import { isEmptyBody, isValidId } from "../../midllewars/index.js";

const contactsRouter = express.Router();

contactsRouter.get('/',contactsControllers.getAll);

contactsRouter.get('/:id', isValidId, contactsControllers.getById);

contactsRouter.post('/', isEmptyBody, validateBody(contactsSchemas.contactsAddSchema), contactsControllers.add);

contactsRouter.put('/:id', isValidId, isEmptyBody,  validateBody(contactsSchemas.contactsAddSchema), contactsControllers.updateById);

contactsRouter.patch('/:id/favorite', isValidId, isEmptyBody,  validateBody(contactsSchemas.contactsUpdateFavoriteShema), contactsControllers.updateFavorite);

contactsRouter.delete('/:id', isValidId, contactsControllers.deleteById);

export default contactsRouter;
