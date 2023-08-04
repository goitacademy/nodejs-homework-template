const express = require("express");
const ctrl = require("../../controllers/contacts")
const contactSchema = require("../../schemasValidation")
const validateBody = require("../../middlewares")

const router = express.Router();

router.get("/", ctrl.getAllContactsList);

router.get("/:id",ctrl.getContactsById);

router.post("/", validateBody(contactSchema), ctrl.addContact );

router.delete("/:id", ctrl.deleteContact);

router.put("/:id", validateBody(contactSchema), ctrl.updateContact);

module.exports = router;
