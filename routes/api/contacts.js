const express = require('express');
const { contactsController } = require('../../controllers');
const { bodySchema } = require('../../schemas/bodySchema');
console.log("bodySchema:", bodySchema)
const { validateBody } = require('../../middlewares');

const router = express.Router();

router
    .route('/')
    .get(contactsController.getContacts)
    .post(validateBody(bodySchema), contactsController.addContacts);

router
    .route('/:contactId')
    .get(contactsController.getContactById)
    .delete(contactsController.deleteContact)
    .put(validateBody(bodySchema), contactsController.updateContact);

module.exports = router;
