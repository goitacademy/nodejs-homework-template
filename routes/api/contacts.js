const router = require("express").Router();
const {
	getAllContacts,
	getById,
	postContact,
	deleteContact,
	changeContact,
} = require("../../controllers");
const bodyValidator = require("../../middlewares/bodyValidator");
const addBodyValidator = require("../../middlewares/addBodyValidator");
const { addSchema, changeSchema } = require("../../schemas/contactsJoiScheme");

router.get("/", getAllContacts);

router.get("/:contactId", getById);

router.post("/", addBodyValidator(addSchema), postContact);

router.put("/:contactId", bodyValidator(changeSchema), changeContact);

router.delete("/:contactId", deleteContact);

module.exports = router;
