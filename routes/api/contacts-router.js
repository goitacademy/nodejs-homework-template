import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import {isEmptyBody, isValidId} from "../../middlewares/index.js";

import {validateBody} from "../../decorators/index.js";

import { contactAddSchema, contactUpdateSchema, contactFavoriteSchema } from "../../models/Contact.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post("/", isEmptyBody, validateBody(contactAddSchema), contactsController.add);

contactsRouter.put("/:id", isValidId, isEmptyBody, validateBody(contactUpdateSchema), contactsController.updateById);

contactsRouter.patch("/:id/favorite", isValidId, isEmptyBody, validateBody(contactFavoriteSchema), contactsController.updateById);

contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

export default contactsRouter;