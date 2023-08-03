const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares/validateBody");
const { addSchema } = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getById);

router.delete("/:contactId", ctrl.removeContact);

router.post("/", validateBody(addSchema), ctrl.addContact);

router.put("/:contactId", validateBody(addSchema), ctrl.updateContact);

module.exports = router;
