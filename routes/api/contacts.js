const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const {
  validateBodyCreate,
  isValidId,
  validateBodyUpdate,
  authenticate,
} = require("../../middlewares");
const {
  addSchemaCreate,
  addSchemaUpdate,
  updateFavoriteSchema,
} = require("../../models/contact");

router.get("/", authenticate, ctrl.listContacts);
router.post(
  "/",
  authenticate,
  validateBodyCreate(addSchemaCreate),
  ctrl.addContact
);
router.get("/:contactId", authenticate, isValidId, ctrl.getContactsById);
router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBodyUpdate(addSchemaUpdate),
  ctrl.updateById
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBodyUpdate(updateFavoriteSchema),
  ctrl.updateStatusContact
);
router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
