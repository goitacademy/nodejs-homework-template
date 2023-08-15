import express from "express";

import contactsCtrl from "../../controllers/contacts-controllers.js";

import { authenticate, validateBody, isValidId, isEmptyBody } from "../../middlewares/index.js";
// import validateBody from "../../middlewares/validateBody.js";
// import isValidId from "../../middlewares/isValidId.js";

import schemas from "../../schemas/contactJoiSchemas.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsCtrl.getAll);

contactsRouter.get("/:contactId", isValidId, contactsCtrl.getById);

contactsRouter.post("/", isEmptyBody, validateBody(schemas.contactAddSchema), contactsCtrl.add);

contactsRouter.put("/:contactId", isValidId, isEmptyBody, validateBody(schemas.contactAddSchema), contactsCtrl.updateById);

contactsRouter.patch("/:contactId/favorite", isValidId, isEmptyBody, validateBody(schemas.updateFavoriteSchema), contactsCtrl.updateFavorite);

contactsRouter.delete("/:contactId", isValidId, contactsCtrl.deleteById);

export default contactsRouter;