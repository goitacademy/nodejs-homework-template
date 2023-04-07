const express = require("express");
const ctrl = require("../../controllers/contacts-controllers");

const { validateBody } = require("../../utils");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateContact);

router.patch("/:id/favorite", ctrl.updateStatusContact);

router.delete("/:id", ctrl.deleteContactById);

module.exports = router;
