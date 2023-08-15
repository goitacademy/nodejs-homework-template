const express = require("express");

const ctrl = require("../../controllers/contacts");

const { addSchema } = require("../../schemas/contacts");

const { validateBody } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validateBody(addSchema), ctrl.updateContact);

module.exports = router;
