const express = require("express");
const ctrl = require("../../controllers/contactsContr");

const router = express.Router();
const addSchema = require("../../schemas/contactsSchema");
const { validateBody } = require("../../middlewares");

router.get("/", ctrl.listContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(addSchema.addSchema), ctrl.addContact);

router.delete("/:id", ctrl.removeContact);

router.put("/:id", validateBody(addSchema.addSchema), ctrl.updateContact);

module.exports = router;
