const express = require('express');

const contactController = require('../../controllers/contactsController');
const contactMiddlewares = require('../../middlewares/contactsMiddlewares');

const router = express.Router();

router
  .route('/')
  .post(contactMiddlewares.checkContactData, contactController.addContact)
  .get(contactController.listContacts);

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' });
//   next();
// });

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

router
  .route('/:id')
  .get(contactController.getContactById)
  .put(contactController.updateContact)
  .delete(contactController.removeContact);

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

module.exports = router;
