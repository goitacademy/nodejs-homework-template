const { Router } = require('express');

const { 
  listContactsController,
  getContactByIdController, 
  addContactController,
  removeContactController,
  updateContactController,
} = require('../../controllers/contactController');

const { checkContactId, checkContactData} = require('../../middlewares/contactMiddleware');

const router = Router();

router.post('/', checkContactData, addContactController);
router.get('/', listContactsController);
router.get('/:id', checkContactId, getContactByIdController);
router.patch('/:id', checkContactId, checkContactData, updateContactController);
router.delete('/:id', checkContactId, removeContactController);

module.exports = router;
