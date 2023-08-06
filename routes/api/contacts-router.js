const express = require("express");
const {
	getAll,
	getContact,
	addNewContact,
	deleteContact,
	updateContactById,
	updateFavorite,
} = require("../../controllers/contacts-controller");
const { validateBody } = require("../../decorators/validateBody");
const { isValidId } = require("../../middlewares/isValidId");
const {
	contactAddSchema,
	contactUpdateFavoriteSchema,
} = require("../../schemas/contacts-schema");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getContact);

router.post("/", validateBody(contactAddSchema), addNewContact);

router.delete("/:contactId", isValidId, deleteContact);

router.put(
	"/:contactId",
	validateBody(contactAddSchema),
	isValidId,
	updateContactById
);

router.patch(
	"/:contactId/favorite",
	validateBody(contactUpdateFavoriteSchema),
	isValidId,
	updateFavorite
);

module.exports = router;
