const router = require("express").Router();
const { isValidId, bodyValidator, addBodyValidator } = require("../../middlewares");
const {
	getAllContacts,
	getById,
	addContact,
	deleteContact,
	changeContact,
	updateContactFavorite,
} = require("../../controllers/contacts");

const { schemas } = require("../../models/contactSchema");

router.get("/", getAllContacts);

router.get("/:contactId", isValidId, getById);

router.post("/", addBodyValidator(schemas.addSchema), addContact);

router.put("/:contactId", isValidId, bodyValidator(schemas.changeSchema), changeContact);

router.patch(
	"/:contactId/favorite",
	isValidId,
	bodyValidator(schemas.changeFavoriteSchema),
	updateContactFavorite,
);

router.delete("/:contactId", isValidId, deleteContact);

module.exports = router;
