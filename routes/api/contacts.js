const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateContactBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateContactBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put(
	"/:contactId",
	isValidId,
	validateContactBody(schemas.addSchema),
	ctrl.updateContact
);

router.patch(
	"/:contactId/favorite",
	isValidId,
	validateContactBody(schemas.updateFavoriteSchema),
	ctrl.updateStatusContact
);

module.exports = router;
