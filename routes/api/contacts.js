const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewars");
const { schemas } = require("../../schema");

router.get("/", controllers.listContacts);

router.get("/:contactId", isValidId, controllers.getContactById);

router.post("/", validateBody(schemas.addSchema), controllers.addContact);

router.delete("/:contactId", isValidId, controllers.removeContact);

router.put(
	"/:contactId",
	isValidId,
	validateBody(schemas.addSchema),
	controllers.updateContactById
);

router.patch(
	"/:contactId/favorite",
	isValidId,
	validateBody(schemas.updateSchema),
	controllers.updateStatusContact
);
module.exports = router;
