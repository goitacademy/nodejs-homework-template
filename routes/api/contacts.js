import express from "express";

import ctrl from "../../controllers/contacts-controller.js";

import { validateBody } from "../../decorators/index.js";
import {
  isBodyEmpty,
  isBodyFavoriteEmpty,
  isValidId,
} from "../../middlewares/index.js";

import contactsSchemas from "../../schemas/contacts-schemas.js";

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post(
  "/",
  isBodyEmpty,
  validateBody(contactsSchemas.addSchema),
  ctrl.add
);

router.put(
  "/:contactId",
  isBodyEmpty,
  isValidId,
  validateBody(contactsSchemas.addSchema),
  ctrl.updateByid
);
router.patch(
  "/:contactId/favorite",
  isBodyFavoriteEmpty,
  isValidId,
  validateBody(contactsSchemas.contactUpdateFavorites),
  ctrl.updateStatusContact
);

router.delete("/:contactId", isValidId, ctrl.deleteById);

export default router;
