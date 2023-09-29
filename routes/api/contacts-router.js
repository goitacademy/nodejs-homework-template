import express from "express";

import contactController from "../../controllers/contact-controller.js";

import { isEmptyBody } from "../../middlewares/indeх.js";

import { validateBody } from "../../decorators/index.js";

import { contactAddSchema } from "../../schemas/contact-schemas.js";

const contactAddValidate = validateBody(contactAddSchema)

const contactsRouter = express.Router();

contactsRouter.get('/', contactController.getAll);

contactsRouter.get('/:contactId', contactController.getById);

contactsRouter.post('/', isEmptyBody, contactAddValidate, contactController.add);

contactsRouter.delete('/:contactId', contactController.deleteById);

contactsRouter.put('/:contactId', isEmptyBody, contactAddValidate, contactController.updateById);

export default contactsRouter;