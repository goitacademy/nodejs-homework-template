import express from "express";

import ctrl from "../../controllers/contacts-controllers.js";

import { validateBody, isValidId, isEmptyBody } from "../../middlewares/index.js";
// import validateBody from "../../middlewares/validateBody.js";
// import isValidId from "../../middlewares/isValidId.js";

import schemas from "../../schemas/contactJoiSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAll);

contactsRouter.get("/:contactId", isValidId, ctrl.getById);

contactsRouter.post("/", isEmptyBody, validateBody(schemas.contactAddSchema), ctrl.add);

contactsRouter.put("/:contactId", isEmptyBody, isValidId, validateBody(schemas.contactAddSchema), ctrl.updateById);

contactsRouter.patch("/:contactId/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

contactsRouter.delete("/:contactId", isValidId, ctrl.deleteById);

export default contactsRouter;