const express = require("express");

const router = express.Router();
const controllers = require("../../controllers/contacts");

const { validateBody } = require("../../middlewars");
const { addSchema } = require("../../schema");

router.get("/", controllers.listContacts);

router.get("/:contactId", controllers.getContactById);

router.post("/", validateBody(addSchema), controllers.addContact);

router.delete("/:contactId", controllers.removeContact);

router.put(
	"/:contactId",
	validateBody(addSchema),
	controllers.updateContactById
);

module.exports = router;
