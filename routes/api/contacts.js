const express = require("express");

const {
	addSchema,
	updateFavoriteSchema,
	updateSchema,
} = require("../../models/contact");

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", isValidId(addSchema), ctrl.getContactById);

router.post("/", validateBody(addSchema), ctrl.addContact);

router.delete("/:id", isValidId(addSchema), ctrl.removeContact);

router.put("/:id", isValidId(updateSchema), validateBody, ctrl.updateContact);

router.patch(
	"/:id/favorite",
	isValidId,
	validateBody(updateFavoriteSchema),
	ctrl.updateFavorite
);

module.exports = router;
