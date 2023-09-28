const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const { addSchema, favoriteSchema } = require("../../models/contacts");

router.get("/", ctrl.listContacts);

router.get("/:id", isValidId, ctrl.getContactById);

router.post("/", validateBody(addSchema), ctrl.addContact);

router.delete("/:id", isValidId, ctrl.removeContact);

router.put("/:id", isValidId, validateBody(addSchema), ctrl.updateContact);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(favoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
