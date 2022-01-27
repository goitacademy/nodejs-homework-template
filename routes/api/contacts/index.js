import { Router } from "express";
import {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from "../../../controllers/contacts";

import {
  validateCreate,
  validateUpdate,
  validateId,
  validateUpdateFavorite,
  validateQuery,
} from "../../../middlewares/validation";

import wrapperError from "../../../middlewares/error-handler";

import guard from "../../../middlewares/guard";

const router = new Router();

router.get("/", [guard, validateQuery], wrapperError(getContacts));

router.get("/:id", [guard, validateId], wrapperError(getContactById));

router.post("/", [guard, validateCreate], wrapperError(addContact));

router.delete("/:id", [guard, validateId], wrapperError(removeContact));

router.put(
  "/:id",
  [guard, validateId, validateUpdate],
  wrapperError(updateContact)
);

router.patch(
  "/:id/favorite",
  [guard, validateId, validateUpdateFavorite],
  wrapperError(updateContact)
);

export default router;
