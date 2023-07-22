import express from "express";
import ctrl from "../../controllers/contacts.js";

import schemas from "../../schemas/contacts.js";
import validateBody from "../../middlewares/validateBody.js";

import isValidId from "../../middlewares/isValidId.js";

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.schema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
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
