const router = require("express").Router();
const {
	isValidId,
	bodyValidator,
	addBodyValidator,
	updateStatus,
	authenticate,
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

router.get("/", authenticate, getAllContacts);

router.get("/:contactId", authenticate, isValidId, getById);

router.post("/", authenticate, addBodyValidator(schemas.addSchema), addContact);

router.put(
	"/:contactId",
	authenticate,
	isValidId,
	bodyValidator(schemas.changeSchema),
	changeContact,
);

router.patch(
	"/:contactId/favorite",
	authenticate,
	isValidId,
	updateStatus(schemas.changeFavoriteSchema, "favorite"),
	updateStatusContact,
);

router.delete("/:contactId", authenticate, isValidId, deleteContact);

module.exports = router;
