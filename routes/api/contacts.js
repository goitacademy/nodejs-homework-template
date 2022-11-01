const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, isValidId, auth } = require("../../middlewars");
const { joiSchema, favoriteSchema } = require("../../models/contacts");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", auth, isValidId, ctrlWrapper(ctrl.getById));

router.post("/", auth, validateBody(joiSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", auth, isValidId, ctrlWrapper(ctrl.remove));

router.put(
  "/:contactId",
  auth,
  isValidId,
  validateBody(joiSchema),
  ctrlWrapper(ctrl.update)
);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validateBody(favoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
