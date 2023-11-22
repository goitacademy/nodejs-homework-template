const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const schemas = require("../../schemas/contact");
const { validateBody, isValidId } = require("../../middlewares");
const { addSchema, updateFavorite } = schemas;

router.get("/", ctrl.getAll);
router.get("/:contactId", isValidId, ctrl.getContactById);
router.post("/", validateBody(addSchema), ctrl.addContact);
router.put(
  "/:contactId",
  isValidId,
  validateBody(addSchema),
  ctrl.updateContact
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavorite),
  ctrl.updateFavoriteById
);
router.delete("/:contactId", isValidId, ctrl.deleteContact);

module.exports = router;
