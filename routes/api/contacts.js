const express = require("express");
const router = express.Router();

const { contacts: controller } = require("../../controllers");
const { validation, controllerWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schema");

router.get("/", controllerWrapper(controller.listContacts));

router.get("/:contactId", controllerWrapper(controller.getContactById));

router.post(
	"/",
	validation(contactSchema),
	controllerWrapper(controller.addContact)
);

router.delete("/:contactId", controllerWrapper(controller.removeContact));

router.put(
	"/:contactId",
	validation(contactSchema),
	controllerWrapper(controller.updateContact)
);

module.exports = router;
