const express = require('express')
const { getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
updateStatusContact,} = require("../../controllers/contactsControllers")
const { checkUpdateContactsData, checkCreateContactsData, checkUpdateFavoriteContactsData } = require('../../middlewares/contactMiddleware');

const router = express.Router()


router
  .route('/')
  .post(checkCreateContactsData, addContact)
  .get(getListContacts);


router
  .route('/:contactId')
  .get(getContactById)
  .patch(checkUpdateContactsData, updateContact)
  .delete(removeContact);

router
  .route('/:contactId/favorite')
  .patch(checkUpdateFavoriteContactsData, updateStatusContact)

module.exports = router



// router.get('/', async (req, res, next) => {
//   const result = await contacts.listContacts();
//   res.json(result)
// })

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })
