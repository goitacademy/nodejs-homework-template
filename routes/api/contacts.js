const express = require('express');
const router = express.Router();

const {
     addContactCtrl, 
     getContactCtrl, 
     getContactByIdCtrl, 
     deleteByIdCtrl, 
     updateContactCtrl, 
     updateFavoriteCtrl,
} = require("../../controllers/contacts");

const { authenticate, isValidId } = require("../../middlewares");

router.get('/', authenticate, getContactCtrl)

router.get('/:contactId', authenticate, isValidId, getContactByIdCtrl)

router.post('/', authenticate, addContactCtrl)

router.delete('/:contactId', authenticate, isValidId, deleteByIdCtrl)

router.put('/:contactId', authenticate, isValidId, updateContactCtrl)

router.patch('/:contactId/favorite', authenticate, isValidId, updateFavoriteCtrl)

module.exports = router;


// {
//     "email": "tree12@gmail.com",
//     "password": "123456"
// }