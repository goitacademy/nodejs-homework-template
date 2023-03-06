const express = require('express');
const {checkUserDate} = require('../../middlewares/userMiddlewares')
const {userSchema,userUpdateSchema} = require('../../schema/userschema')
const { listContacts, getContactById, addContact, updateContact, removeContact } = require('../../models/contacts');


const router = express.Router();

router
    .route('/')
    .get(listContacts)
    .post(checkUserDate(userSchema), addContact);

router
    .route('/:contactId')
    .get(getContactById)
    .put(checkUserDate(userUpdateSchema),updateContact)
    .delete(removeContact);


module.exports = router
