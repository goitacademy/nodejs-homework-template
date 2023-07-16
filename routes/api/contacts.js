const express = require('express');

const ctrl = require('../../controllers/contacts')

const { bodyValidator } = require('../../middlewares');

const schemas = require('../../schemas/contacts')

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactByID);

router.post("/", bodyValidator(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", bodyValidator(schemas.addSchema), ctrl.updateContact);

module.exports = router;
