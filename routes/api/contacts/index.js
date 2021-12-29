import express from "express";
import {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} from "../../../controllers";

import {
  validateCreate,
  validateUpdate,
  validateId,
  validateUpdateFavorite,
  validateQuery,
} from "../../../midllewares/validation/validationContacts";

import guard from "../../../midllewares/guard";

const router = express.Router();

router.get("/", [guard, validateQuery], listContactsController);

router.get("/:id", [guard, validateId], getContactByIdController);

router.post("/", [guard, validateCreate], addContactController);

router.delete("/:id", [guard, validateId], removeContactController);

router.put(
  "/:id",
  [guard, validateId],
  validateUpdate,
  updateContactController
);

router.patch(
  "/:id/favorite/",
  [guard, validateUpdateFavorite],
  updateStatusContactController
);

export default router;
