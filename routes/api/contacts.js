const express = require('express');
const {
    getContacts,
    getContactById,
    addContact,
    updateContact,
    updateFavorite,
    removeContact,
} = require('../../controllers/contacts');
const { validateBody, validateParams } = require('../../middlewares');
const {
    validationCreateContact,
    validationUpdateContact,
    validationFavoriteContact,
    validationMangoId,
} = require('../../service/validation');

const router = new express.Router();

router
    .get('/', getContacts)
    .post('/', validateBody(validationCreateContact), addContact);

router
    .get('/:contactId', validateParams(validationMangoId), getContactById)
    .put(
        '/:contactId', [validateBody(validationUpdateContact), validateParams(validationMangoId)],
        updateContact,
    )
    .delete('/:contactId', validateParams(validationMangoId), removeContact);

router.patch(
    '/:contactId/favorite', [validateBody(validationFavoriteContact), validateParams(validationMangoId)],
    updateFavorite,
);

module.exports = router;