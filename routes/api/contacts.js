const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const schemas = require("../../models/contact");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { addSchema, updateFavorite } = schemas;

router.get("/", authenticate, ctrl.getAll);
router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);
router.post("/", authenticate, validateBody(addSchema), ctrl.addContact);
router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(addSchema),
  ctrl.updateContact
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavorite),
  ctrl.updateFavoriteById
);
router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContact);

module.exports = router;
