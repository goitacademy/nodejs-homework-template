import express from "express";
import contactControllers from "../../controllers/contact-controller.js";
import contactsSchemas from "../../schemas/contacts-schemas.js";

import {validateBody} from "../../decorators/index.js";

const contactsRouter = express.Router();

contactsRouter.get('/', contactControllers.getAll)

contactsRouter.get('/:id', contactControllers.getById)

contactsRouter.post('/', validateBody(contactsSchemas.contactsAddSchema), contactControllers.add)

contactsRouter.delete('/:id', contactControllers.deleteById)

contactsRouter.put('/:id', validateBody(contactsSchemas.contactsAddSchema), contactControllers.updateById)

export default contactsRouter;