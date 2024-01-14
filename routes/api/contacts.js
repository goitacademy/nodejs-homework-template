const express = require("express");

const ctrl = require("../../controllers/contactsController");

const {
	isEmptyBody,
	isValidId,
	isEmptyFavorite,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

const { validateBody } = require("../../decorators");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:id", isValidId, ctrl.getById);

router.post(
	"/",
	isEmptyBody,
	validateBody(schemas.addSchema),
	ctrl.addNewContact
);

router.delete("/:id", isValidId, ctrl.deleteContact);

router.put(
	"/:id",
	isEmptyBody,
	isValidId,
	validateBody(schemas.putSchema),
	ctrl.updateContactById
);

router.patch(
	"/:id/favorite",
	isEmptyFavorite,
	isValidId,
	validateBody(schemas.patchSchema),
	ctrl.updateStatusContact
);

module.exports = router;
