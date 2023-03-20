const { Router } = require('express');

const { 
  listContacts,
  getContactById, 
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/contactController');

const { checkContactId, checkCreateContactData, checkUpdateContactData, checkFavoriteContactData} = require('../../middlewares/contactMiddleware');

const router = Router();

router.post('/', checkCreateContactData, addContact);
router.get('/', listContacts);
router.get('/:id', checkContactId, getContactById);
router.patch('/:id',  checkUpdateContactData, updateContact);
router.patch('/:id/favorite',  checkContactId, checkFavoriteContactData, updateStatusContact);
router.delete('/:id', checkContactId, removeContact);

module.exports = router;
