const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

const router = express.Router();

router.get("/", ctrl.getContactsList);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(contactSchema), ctrl.addContact);

router.put("/:contactId", validateBody(contactSchema), ctrl.updateContact);

router.delete("/:contactId", ctrl.deleteContact);

module.exports = router;