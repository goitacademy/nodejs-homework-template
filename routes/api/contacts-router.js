import express from "express";
import contactsControllers from "../../controllers/contacts-controllers.js";
import contactsSchemas from "../../schemas/contacts-schemas.js";
import  validateBody  from "../../decorators/validateBody.js";
import { isEmptyBody, upload, isValidId, authenticate } from "../../midllewars/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', contactsControllers.getAll);

contactsRouter.get('/:id', isValidId, contactsControllers.getById);

contactsRouter.post('/', upload.single('avatar'), isEmptyBody, validateBody(contactsSchemas.contactsAddSchema), contactsControllers.add);

contactsRouter.put('/:id', isValidId, isEmptyBody,  validateBody(contactsSchemas.contactsAddSchema), contactsControllers.updateById);

contactsRouter.patch('/:id/favorite', isValidId, isEmptyBody,  validateBody(contactsSchemas.contactsUpdateFavoriteSchema), contactsControllers.updateFavorite);

contactsRouter.delete('/:id', isValidId, contactsControllers.deleteById);

export default contactsRouter;
