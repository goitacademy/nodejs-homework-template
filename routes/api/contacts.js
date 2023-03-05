const express = require('express');
const {checkUserDate} = require('../../middlewares/userMiddlewares')
const {userSchema} = require('../../schema/userschema')
const { listContacts, getContactById, addContact, updateContact, removeContact } = require('../../models/contacts');


const router = express.Router();

router
    .route('/')
    .get(listContacts)
    .post(checkUserDate(userSchema), addContact);

router
    .route('/:contactId')
    .get(getContactById)
    .put(checkUserDate(userSchema),updateContact)
    .delete(removeContact);

// router.get('/', listContacts);
// router.get('/:contactId', getContactById);
// router.post('/', addContact);
// router.delete('/:contactId', removeContact);
// router.put('/:contactId', updateContact);

module.exports = router
