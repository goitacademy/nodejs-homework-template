import express from "express";

import contactControllers from "../../controllers/contacts-controllers.js"

import isEmptyBody from "../../midllewares/isEmptyBody.js";

import validateBody from "../../decorators/validaterBody.js";
import { contactAddSchema, contactUpdateSchema } from "../../schemas/validationSchema.js";

const contactsRouter = express.Router()


contactsRouter.get('/', contactControllers.getAll)

contactsRouter.get('/:contactId', contactControllers.getById)

contactsRouter.post('/', isEmptyBody, validateBody(contactAddSchema), contactControllers.add)

contactsRouter.delete('/:contactId', contactControllers.deleteById)

contactsRouter.put('/:contactId',  isEmptyBody, validateBody(contactUpdateSchema), contactControllers.updateById)

export default contactsRouter;