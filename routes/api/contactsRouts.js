const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  addNewContact,
  getOneContact,
  removeOneContact,
  updateOneContact,
} = require('../../controllers/contactsController');
// Что бы не писать в каждом маршруте /api/contacts или /api/contacts/:contactId мы прописываем этот маршрут сразу в app.js при подключении раутера app.use('/api/contacts', contactsRouter). Так что "/" === /api/contacts в данном случае.

router.get('/', getAllContacts);

router.get('/:contactId', getOneContact);

router.post('/', addNewContact);

router.delete('/:contactId', removeOneContact);

router.put('/:contactId', updateOneContact);

module.exports = router;
