const express = require('express');
const router = express.Router();
const {auth} = require('../../middlewares/auth')

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite
} = require('../../controllers');

    
const { schemaCreate, schemaPatch } = require('../../models/contact');
const { validation } = require('../../middlewares/validation');

router.get('/', auth, listContacts); 

router.get('/:id', getContactById);

router.post('/', validation(schemaCreate), auth, addContact);
  
router.delete('/:id', auth, removeContact);
    
router.put('/:id', updateContact);

router.patch('/:id/favorite', validation(schemaPatch), auth, updateFavorite);


module.exports = router;


