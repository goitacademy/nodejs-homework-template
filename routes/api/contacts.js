const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const {
  validateBodyCreate,
  isValidId,
  validateBodyUpdate,
} = require("../../middlewares");
const {
  addSchemaCreate,
  addSchemaUpdate,
  updateFavoriteSchema,
} = require("../../models/contact");

router.get("/", ctrl.listContacts);
router.post("/", validateBodyCreate(addSchemaCreate), ctrl.addContact);
router.get("/:contactId", isValidId, ctrl.getContactsById);
router.put(
  "/:contactId",
  isValidId,
  validateBodyUpdate(addSchemaUpdate),
  ctrl.updateById
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBodyUpdate(updateFavoriteSchema),
  ctrl.updateStatusContact
);
router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
