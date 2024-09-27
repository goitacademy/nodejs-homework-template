const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);
router.get("/:id", authenticate, isValidId, ctrl.getContactById);
router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);
router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);
router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);
router.delete("/:id", authenticate, isValidId, ctrl.removeContact);

module.exports = router;
