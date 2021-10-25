const express = require('express')
const router = express.Router()


const { joiContactSchema } = require("../../models/contacts.schema")        
const { validation } = require("../../validation")
const ctrl = require("../../controllers/contacts")
const validationMiddleware = validation(joiContactSchema);


router.get("/", ctrl.listContacts); 

router.get("/:contactId", ctrl.getContactById); 

router.post("/", validationMiddleware, ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);


router.put("/:contactId/favorite", validationMiddleware, ctrl.updateStatusContact);

module.exports = router
