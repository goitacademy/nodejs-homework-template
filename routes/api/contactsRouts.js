const express = require('express')

const contactController = require('../../controllers/contactController')
const contactMiddlewares = require('../../middlewares/contactMiddlewares')

const router = express.Router()

router.route('/')
  .post(contactMiddlewares.checkContactData, contactController.createContact)
  .get(contactController.getContacts);

router.use('/:id', contactMiddlewares.checkContactId);

router
  .route('/:id')
  .get(contactController.getContactById)
  .patch(contactMiddlewares.checkContactData, contactController.updateContactById)
  .delete(contactController.deleteContactById);

module.exports = router;


// router.get('/api/contacts', async (req, res, next) => {
  
//   res.json({ message: 'template message' })
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

module.exports = router
