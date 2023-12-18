const express = require('express');
const { contactsController } = require('../../controllers');
const { bodySchemaCreate, bodySchemaUpdate } = require('../../schemas/bodySchema');
const { validateBody, checkValidId } = require('../../middlewares');

const router = express.Router();

router
    .route('/')
    .get(contactsController.getContacts)
    .post(validateBody.checkCreate(bodySchemaCreate), contactsController.addContacts);
router.use('/:contactId', checkValidId);
router
    .route('/:contactId')
    .get(contactsController.getContactById)
    .delete(contactsController.deleteContact)
    .put(validateBody.checkUpdate(bodySchemaUpdate), contactsController.updateContact);
router.route('/:contactId/favorite').patch(validateBody.checkUpdateFavorite, contactsController.updateStatus);

module.exports = router;
