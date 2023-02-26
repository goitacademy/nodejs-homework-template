const express = require('express');
const router = express.Router();

const {
    getContacts,
    getContactById,
    addContact,
    deleteContact,
    patchContact,
} = require('../../models/controllers/postController');

const {addPostValidation, updatePostValidation}  = require('../../middlewars/postsValitation');


router.get('/', getContacts )

router.get('/:contactId', getContactById )

router.post('/', addPostValidation, addContact)

router.delete('/:contactId', deleteContact )

router.patch('/:contactId', updatePostValidation, patchContact )

module.exports = router
