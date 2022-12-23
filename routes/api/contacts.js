const express = require('express');

const { validation, paramValidation } = require('../../middlewares');
const { contactSchema, schemaId } = require('../../schemas/contacts')


const {contacts: contactController} = require('../../controllers');

const validateMiddleware = validation(contactSchema);
const validateMiddlewareId = paramValidation(schemaId);

const router = express.Router();


router.get('/', contactController.getAll)

router.get('/:contactId',validateMiddlewareId, contactController.getOneById) 

router.post('/', validateMiddleware, contactController.addContact) 

router.delete('/:contactId',validateMiddlewareId ,contactController.deleteContact)

router.put('/:contactId',validateMiddlewareId, validateMiddleware, contactController.updateContact)

module.exports = router