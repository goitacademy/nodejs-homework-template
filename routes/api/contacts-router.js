import express from "express";
import {validateBody} from "../../decorators/index.js";
import contactsSchemas from "../../schemas/contacts-schemas.js";
import contactsController from "../../controllers/contacts-controller.js"
import {isEmptyBody, isValidId} from "../../middlewares/index.js";
const contactsRouter = express.Router()


contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:id', isValidId, contactsController.getById);

contactsRouter.post('/', isEmptyBody, validateBody(contactsSchemas.contactAddSchema), contactsController.add);

contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

contactsRouter.put("/:id", isValidId, isEmptyBody, validateBody(contactsSchemas.contactAddSchema), contactsController.updateById);
contactsRouter.patch("/:id/favorite", isValidId, isEmptyBody, validateBody(contactsSchemas.contactUpdateFavoriteSchema), contactsController.updateFavorite);
export default contactsRouter;
