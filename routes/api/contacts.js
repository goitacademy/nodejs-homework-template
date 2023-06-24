const express = require('express')

const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact } = require('../../controllers/contacts')
    
const { checkContactById, checkCreateContactData } = require('../../middlewares/contactMiddlewares');
const { protect } = require('../../middlewares/authMiddlewares');

const router = express.Router();

router.use(protect);
router.get('/', listContacts);
router.post('/', checkCreateContactData, addContact)

router.use('/:id', checkContactById);
router
  .route('/:id')
  .get(getContactById)
  .patch(updateContact)
  .delete(removeContact);

module.exports = router;