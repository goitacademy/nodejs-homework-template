const express = require('express');
const { contactsController } = require('../../controllers');
const { bodySchemaCreate, bodySchemaUpdate } = require('../../schemas/contactSchema');
const { validateBody, checkValidId, checkUserByToken, validateQuery } = require('../../middlewares');
const querySchema = require('../../schemas/querySchema');

const router = express.Router();

router.use(checkUserByToken)
router
    .route('/')
    .get(validateQuery(querySchema), contactsController.getContacts)
    .post(validateBody.checkCreate(bodySchemaCreate), contactsController.addContacts);
router.use('/:contactId', checkValidId);
router
    .route('/:contactId')
    .get(contactsController.getContactById)
    .delete(contactsController.deleteContact)
    .put(validateBody.checkUpdate(bodySchemaUpdate), contactsController.updateContact);
router.route('/:contactId/favorite').patch(validateBody.checkUpdateFavorite, contactsController.updateStatus);

module.exports = router;
