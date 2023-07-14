const express = require("express");
const controllers = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", controllers.listContacts);

router.get("/:contactId", controllers.getContactById);

router.post("/", validateBody(schemas.addSchema), controllers.addContact);

router.delete("/:contactId", controllers.removeContact);

router.put(
	"/:contactId",
	validateBody(schemas.addSchema),
	controllers.updateContact
);

module.exports = router;
