const express = require('express');

const { isValidId, authenticate } = require('../../middlewares');

const {
    getAllContacts,
    getContactById,
    deleteContact,
    postContact,
    putContact,
    updateStatusContact,
} = require('../../controllers/contacts/index');

const router = express.Router();

router.get('/', authenticate, getAllContacts);
router.get('/:contactId', authenticate, isValidId, getContactById);
router.delete('/:contactId', authenticate, isValidId, deleteContact);
router.post('/', authenticate, postContact);
router.put('/:contactId', authenticate, isValidId, putContact);
router.patch('/:contactId/favorite', authenticate, isValidId, updateStatusContact);

module.exports = router;
