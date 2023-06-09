const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { validateBody, isValidId, authenticate } = require("../../middlewarse");

const { schema, updateFavoriteSchemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.getAll);
router.get("/");

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody.validateBodyPost(schema),
  ctrl.post
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody.validateBodyPatch(updateFavoriteSchemas),

  ctrl.updateStatusContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,

  validateBody.validateBodyPut(schema),
  ctrl.putById
);

module.exports = router;
