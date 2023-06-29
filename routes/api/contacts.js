const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { validateBody } = require("../../middlewars/index");
const schema = require("../../schemas/contacts");

router.get("/", ctrl.contactList);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(schema.addSchema), ctrl.addContact);

router.put("/:id", validateBody(schema.addSchema), ctrl.updateContact);

router.delete("/:id", ctrl.removeContact);

module.exports = router;
