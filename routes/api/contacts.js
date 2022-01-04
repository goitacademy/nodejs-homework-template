const express = require('express')
const {validation, controlslWrapper} = require("../../middlewares");
const {contactSchema} = require("../../schemas");
const {contacts: controls} = require("../../controllers");

const validateMiddleWare = validation(contactSchema);

const router = express.Router();

router.get("/", controlslWrapper(controls.listContacts));

router.get("/:contactId", controlslWrapper(controls.getById));

router.post("/", validateMiddleWare, controlslWrapper(controls.addContact));

router.put("/:contactId", validateMiddleWare, controlslWrapper(controls.updateContact));

router.delete("/:contactId", controlslWrapper(controls.removeContact));

module.exports = router
