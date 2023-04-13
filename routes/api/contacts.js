const router = require("express").Router();
const {
	isValidId,
	bodyValidator,
	addBodyValidator,
	updateFavoriteStatus,
} = require("../../middlewares");
const {
	getAllContacts,
	getById,
	addContact,
	deleteContact,
	changeContact,
	updateStatusContact,
} = require("../../controllers/contacts");

const { schemas } = require("../../models/contactSchema");

router.get("/", getAllContacts);

router.get("/:contactId", isValidId, getById);

router.post("/", addBodyValidator(schemas.addSchema), addContact);

router.put("/:contactId", isValidId, bodyValidator(schemas.changeSchema), changeContact);

router.patch(
	"/:contactId/favorite",
	isValidId,
	updateFavoriteStatus(schemas.changeFavoriteSchema),
	updateStatusContact,
);

router.delete("/:contactId", isValidId, deleteContact);

module.exports = router;
