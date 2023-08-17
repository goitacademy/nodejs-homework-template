const express = require('express');

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewaers");

const { addSchema } = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getContactById);

router.post('/', validateBody(addSchema), ctrl.addContact);

router.put("/:id", validateBody(addSchema), ctrl.updateContactById);

router.delete("/:id", ctrl.deleteContactById);

module.exports = router;