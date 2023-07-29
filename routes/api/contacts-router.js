import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import { validateBody } from "../../decorators/index.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js"
import contactsSchemas from "../../schemas/contacts-schemas.js";

const contactsRouter = express.Router();



contactsRouter.get('/', contactsController.getAll)

contactsRouter.get('/:id', isValidId, contactsController.getById )

contactsRouter.post('/',isEmptyBody, validateBody(contactsSchemas.contactAddSchema), contactsController.add)

contactsRouter.put('/:id', isValidId, isEmptyBody, validateBody(contactsSchemas.contactAddSchema), contactsController.updateById)

contactsRouter.patch("/:id/favorite", isValidId, isEmptyBody, validateBody(contactsSchemas.contactUpdateFavoriteSchema), contactsController.updateStatusContact);

contactsRouter.delete('/:id',isValidId, contactsController.deleteById)

export default contactsRouter;
