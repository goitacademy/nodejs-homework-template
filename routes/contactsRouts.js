const express = require('express');
const router = express.Router();
const {addContact,getAllContacts,getContact,removeContact,updateContact,updateStatusContact} = require('../controllers');
const {validateAdd,validateUpdate,validateUpdateStatus} = require('../middlewares/validation');
const guard = require('../middlewares/guard')


router.get('/', guard, getAllContacts);

router.get('/:id', guard,getContact );

router.post('/',guard,validateAdd,addContact);
router.patch('/:id/favorite',guard,validateUpdateStatus,updateStatusContact)

router.put('/:id',guard,validateUpdate,updateContact);

router.delete('/:id', guard,removeContact);

module.exports= router;