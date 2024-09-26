const express = require('express')
const { getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,} = require("../../models/contacts")

const router = express.Router()


router.route('/').post(addContact).get(getListContacts);

// router.use('/:id', checkUserId);
router
  .route('/:contactId')
  .get(getContactById)
  .patch(updateContact)
  .delete(removeContact);


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
