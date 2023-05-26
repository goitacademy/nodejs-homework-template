const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { validateBody, isValidId } = require("../../middlewarse");

const { schema, updateFavoriteSchemas } = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody.validateBodyPost(schema), ctrl.post);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody.validateBodyPatch(updateFavoriteSchemas),

  ctrl.updateStatusContact
);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  isValidId,

  validateBody.validateBodyPut(schema),
  ctrl.putById
);

module.exports = router;
