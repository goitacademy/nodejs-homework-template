const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewars");
const schemas = require("../../schemas/contacts");
const router = express.Router();

router.get("/", ctrl.listContact);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateContact);
router.delete("/:id", ctrl.removeContact);
module.exports = router;
