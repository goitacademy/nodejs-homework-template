import express from "express";
import ctrl from "../../controllers/contacts.js";

import schemas from "../../schemas/contacts.js";
import { isEmpty, isValidId, validateBody } from "../../middlewares/index.js";

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.schema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  isEmpty,
  isValidId,
  validateBody(schemas.schema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

export default router;
