const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateContactBody } = require("../../middlewares");

const schemas = require("../../schemas/contact");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateContactBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put(
	"/:contactId",
	validateContactBody(schemas.addSchema, 400, "missing required name field"),
	ctrl.updateContact
);

module.exports = router;
