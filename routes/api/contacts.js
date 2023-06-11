const express = require("express");
const ctrl = require("../../controllers/contacts");
const {validateBody}=require('../../middlewares');
const contactSchema = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/",validateBody(contactSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContactById );

router.put("/:contactId", validateBody(contactSchema), ctrl.updateContactById);

module.exports = router;
