const express = require('express')
const {listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/contactControllers')
const {checkContactById, checkCreateContactData} = require('../../middlewares/contactMiddlewares')

const router = express.Router()

router
  .route('/')
  .get(listContacts)
  .post(checkCreateContactData, addContact)

router.use('/:contactId', checkContactById);
router
  .route('/:contactId')
  .get(getContactById)
  .put(updateContact)
  .delete(removeContact)

router.patch('/:contactId/favorite', updateStatusContact)

module.exports = router