const express = require('express');
const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");
const schema = require("../../schemas/contacts");


router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schema.addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContactById);

router.put("/:contactId",  validateBody(schema.addSchema), ctrl.updateContactById);

module.exports = router;
