const express = require("express");

const { validateBody, isValidId, auth } = require("../../Middlewares");
const { contacts: ctrl } = require("../../Controller");

const { schemas } = require("../../models");

const router = express.Router();

router.get("/", auth, ctrl.listContacts);

router.get("/:id", auth, isValidId, ctrl.getById);

router.post(
  "/",
  auth,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.put(
  "/:id",
  isValidId,
  auth,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  auth,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);
router.delete("/:id", auth, isValidId, ctrl.removeContact);

module.exports = router;