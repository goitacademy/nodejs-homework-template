/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const { validation } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validation(contactSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.patch("/:contactId", validation(contactSchema), ctrl.updateContactById);

module.exports = router;
