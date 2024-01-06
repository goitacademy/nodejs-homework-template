const express = require("express");

const ctrl = require("../../controllers/contactsController");

const { validateBody, isEmptyBody } = require("../../middlewares");
const { addSchema, putSchema } = require("../../schemas/contactsSchemas");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getById);

router.post("/", isEmptyBody, validateBody(addSchema), ctrl.addNewContact);

router.delete("/:id", ctrl.deleteContact);

router.put(
	"/:id",
	isEmptyBody,
	validateBody(putSchema),
	ctrl.updateContactById
);

module.exports = router;
