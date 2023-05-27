const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middleWares");
const schemas = require("../../schemas/contacts");

router.get("/", ctrl.listContacts);
router.get("/:contactId", ctrl.getContactById);
router.post("/", validateBody(schemas.addSchema), ctrl.addContact);
router.put("/:contactId", validateBody(schemas.addSchema), ctrl.changeContact);
router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
