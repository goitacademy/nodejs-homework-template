const express = require("express");

const { validation, ctrlWrraper } = require("../../middlewares");
const { contactsSchema } = require("../../schemas");

const router = express.Router();

const validateMiddleware = validation(contactsSchema);

const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrlWrraper(ctrl.listContacts));

router.get("/:contactId", ctrlWrraper(ctrl.getContactById));

router.post("/", validateMiddleware, ctrlWrraper(ctrl.addContact));

router.delete("/:contactId", ctrlWrraper(ctrl.removeContact));

router.put("/:contactId", validateMiddleware, ctrlWrraper(ctrl.updateContact));


module.exports = router;
