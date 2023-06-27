const express = require('express');




const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewars");
const addSchema = require("../../schemas/contacts");

router.get('/', ctrl.getAll);

router.get("/:contactId", ctrl.getContactById);

router.post('/',validateBody(addSchema), ctrl.addContacts);

router.delete("/:contactId", ctrl.deleteContacts);

router.put("/:contactId",validateBody(addSchema), ctrl.changeContacts);

module.exports = router;
