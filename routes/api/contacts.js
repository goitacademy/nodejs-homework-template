const express = require('express');
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite
} = require('../../controllers/contacts');

    
const { schemaCreate, schemaPatch } = require('../../models/contact');
const { validation } = require('../../middlewares/validation');

router.get('/', listContacts); 

router.get('/:id', getContactById);

router.post('/', validation(schemaCreate), addContact);
  
router.delete('/:id', removeContact);
    
router.put('/:id', updateContact);

router.patch('/:id/favorite', validation(schemaPatch), updateFavorite);


module.exports = router;


