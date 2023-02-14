const express = require('express');
const { tryCatchWrapper } = require('../../helpers/index');
const { validateBody, upload, resize } = require('../../middlewares/index');
const { addContactsSchema, editContactsSchema, favoriteContactschema } = require('../../schemas/contacts');
const {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
  uploadImage,
} = require('../../controllers/contacts.controller');

const routerContacts = express.Router();

routerContacts.get('/', tryCatchWrapper(getContacts));
routerContacts.get('/:id', tryCatchWrapper(getContact));
routerContacts.post('/', validateBody(addContactsSchema), tryCatchWrapper(createContact));
routerContacts.delete('/:id', tryCatchWrapper(deleteContact));
routerContacts.put('/:id', validateBody(editContactsSchema), tryCatchWrapper(updateContact));
routerContacts.patch('/:id', validateBody(favoriteContactschema), tryCatchWrapper(updateStatusContact));
routerContacts.patch('/:id/avatarURL', upload.single('avatarURL'), resize(250, 250), tryCatchWrapper(uploadImage));

module.exports = {
  routerContacts,
};

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'Home work №2 done!!' })
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

// module.exports = router
