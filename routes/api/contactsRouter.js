import express from "express";
const contactsRouter = express.Router();
import {
  ctrlAdd,
  ctrlDeleteById,
  ctrlGetAll,
  ctrlGetById,
  ctrlUpdateById,
  ctrlUpdateFavorite,
} from "../../controllers/contacts/index.js";

import { validateAdd, validateUpdateFavorite } from "../../schemas/contacts.js";

import { validateBody, validateId } from "../../middlewares/index.js";
contactsRouter.get("/", ctrlGetAll);

contactsRouter.get("/:contactId", validateId, ctrlGetById);

contactsRouter.post("/", validateBody(validateAdd), ctrlAdd);

contactsRouter.delete("/:contactId", ctrlDeleteById);

contactsRouter.put("/:contactId", validateBody(validateAdd), ctrlUpdateById);

contactsRouter.patch(
  "/:contactId/favorite",
  validateBody(validateUpdateFavorite),
  ctrlUpdateFavorite
);

export default contactsRouter;
