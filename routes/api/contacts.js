const express = require('express');
const router = express.Router();

const {
    getContacts,
    getContactById,
    addContact,
    deleteContact,
    putContact,
} = require('../../models/controllers/postController');

const {addPostValidation, updatePostValidation}  = require('../../middlewars/postsValitation');


router.get('/', getContacts )

router.get('/:contactId', getContactById )

router.post('/', addPostValidation, addContact)

router.delete('/:contactId', deleteContact )

router.put('/:contactId', updatePostValidation, putContact )

module.exports = router
