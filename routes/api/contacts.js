const express = require("express");

const ctrl = require("../../controllers/contacts");

const { schemas } = require("../../models/contact");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

// при запиті перевіряємо чи користувач залогінився authenticate
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
	ctrl.updateFavorite
);

module.exports = router;
