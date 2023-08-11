import express from "express";

import ctrl from "../../controllers/contacts.js";

// import { validateBody, isValidId } from "../../middlewares";
import validateBody from "../../middlewares/validateBody.js";
import isValidId from "../../middlewares/isValidId.js";

import schemas from "../../models/contact.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAll);

// contactsRouter.get("/:contactId", isValidId, ctrl.getById);

// contactsRouter.post("/", validateBody(schemas.contactAddSchema), ctrl.add);

// contactsRouter.put("/:contactId", isValidId, validateBody(schemas.contactAddSchema), ctrl.updateById);

// contactsRouter.patch("/:contactId/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

// contactsRouter.delete("/:contactId", isValidId, ctrl.deleteById);

export default contactsRouter;