const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers");
const { validateBody } = require("../../middlewares");
const schema = require("../../schemas");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schema.addSchema), ctrl.addContact);

router.put("/:contactId", validateBody(schema.addSchema), ctrl.updateContact);

router.delete("/:contactId", ctrl.deleteContact);

module.exports = router;
