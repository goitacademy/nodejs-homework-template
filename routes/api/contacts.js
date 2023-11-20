const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares/index");

const { addSchema, updateFavoriteSchema } = require("../../models/Contact");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", isValidId, ctrl.getContactById);

router.post(
  "/",
  validateBody(addSchema),
  ctrl.addContact
);

router.put(
	"/:id",
  isValidId,
  ctrl.updateContact
);

router.patch(
	"/:id/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:id", isValidId, ctrl.removeContact);

module.exports = router;
