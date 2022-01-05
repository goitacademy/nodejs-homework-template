const express = require('express')
const {validation, controlslWrapper} = require("../../middlewares");
const {contactJoiSchema, contactFavoriteSchema} = require("../../models/contact");
const {contacts: controls} = require("../../controllers");

console.log(controls.listContacts);

const validateMiddleWare = validation(contactJoiSchema);

const router = express.Router();

router.get("/", controlslWrapper(controls.listContacts));

router.get("/:contactId", controlslWrapper(controls.getById));

router.post("/", validateMiddleWare, controlslWrapper(controls.addContact));

router.put("/:contactId", validateMiddleWare, controlslWrapper(controls.updateContact));

router.patch("/:contactId/favorite", validation(contactFavoriteSchema), controlslWrapper(controls.updateStatusContact));

router.delete("/:contactId", controlslWrapper(controls.removeContact));

module.exports = router
