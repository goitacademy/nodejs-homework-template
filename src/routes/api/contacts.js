const express = require('express')
const router = express.Router()


const { joiContactSchema } = require("../../models/contacts.schema")        
const { validation, controllerWrapper, authentication } = require("../../middlewares")
const ctrl = require("../../controllers/contacts")
const validationMiddleware = validation(joiContactSchema);


router.get("/", controllerWrapper(authentication), ctrl.listContacts); 

router.get("/:contactId", ctrl.getContactById); 

router.post("/", controllerWrapper(authentication), validationMiddleware, ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);


router.put("/:contactId/favorite", validationMiddleware, ctrl.updateStatusContact);

module.exports = router
