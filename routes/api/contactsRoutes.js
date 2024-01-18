const express = require("express");
const ctrl = require("../../controllers/contactsContr");

const router = express.Router();
const { schemas } = require("../../models/contact");
const { validateBody, isValidId, authenticate } = require("../../middlewares");

router.get("/", authenticate, ctrl.listContacts);

router.get("/:id", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:id", authenticate, isValidId, ctrl.removeContact);

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

module.exports = router;
