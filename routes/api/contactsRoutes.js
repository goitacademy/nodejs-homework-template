const express = require('express');
const router = express.Router();
const {
  getAllContactsController,
  addNewContactController,
  getOneContactController,
  removeOneContactController,
  updateOneContactController,
  updateFavoriteController,
} = require('../../controllers/contactsController');
const authMiddleware = require('../../middlewares/authMiddleware');

// Что бы не писать в каждом маршруте /api/contacts или /api/contacts/:contactId мы прописываем этот маршрут сразу в app.js при подключении раутера app.use('/api/contacts', contactsRouter). Так что "/" === /api/contacts в данном случае.

router.use(authMiddleware);

router.get('/', getAllContactsController);

router.get('/:contactId', getOneContactController);

router.post('/', addNewContactController);

router.delete('/:contactId', removeOneContactController);

router.put('/:contactId', updateOneContactController);

router.patch('/:contactId', updateFavoriteController);

module.exports = router;
