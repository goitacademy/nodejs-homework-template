const express = require('express');
const router = express.Router();

const { addContactCtrl, getContactCtrl, getContactByIdCtrl, deleteByIdCtrl, updateContactCtrl, updateFavoriteCtrl } = require("../../controllers/contacts")

router.get('/', getContactCtrl)

router.get('/:contactId', getContactByIdCtrl)

router.post('/', addContactCtrl)

router.delete('/:contactId', deleteByIdCtrl)

router.put('/:contactId', updateContactCtrl)

router.patch('/:contactId/favorite', updateFavoriteCtrl)

module.exports = router;
