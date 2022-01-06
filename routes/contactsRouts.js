const express = require('express');
const router = express.Router();
const {addContact,getAllContacts,getContact,removeContact,updateContact,updateStatusContact} = require('../controllers');
const {validateAdd,validateUpdate,validateUpdateStatus} = require('../middlewares/validation')


router.get('/', getAllContacts);

router.get('/:id', getContact );

router.post('/',validateAdd,addContact);
router.patch('/:id/favorite',validateUpdateStatus,updateStatusContact)

router.put('/:id',validateUpdate,updateContact);

router.delete('/:id', removeContact);

module.exports= router;