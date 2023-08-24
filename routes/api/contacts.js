const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const {
	validateBody,
	isValidId,
	isValidFavorite,
	authenticate,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.listContacts);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post(
	"/",
	authenticate,
	validateBody(schemas.addSchema),
	ctrl.addContact
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteContact);

router.put(
	"/:id",
	authenticate,
	isValidId,
	validateBody(schemas.addSchema),
	ctrl.updateContact
);

router.patch(
	"/:id",
	authenticate,
	isValidFavorite,
	validateBody(schemas.updateFavoriteSchema),
	ctrl.updateFavorite
);



module.exports = router;
