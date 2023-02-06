const express = require('express');
const { tryCatchWrapper } = require('../../helpers/index');
const { validateBody } = require('../../middlewares/index');
const { addContactsSchema } = require('../../schemas/contactValidationSchemas');
const { getContact, getContacts, createContact, deleteContact } = require('../../controllers/contactsControllers');

const routerContacts = express.Router();

routerContacts.get('/', tryCatchWrapper(getContacts));
routerContacts.get('/:id', tryCatchWrapper(getContact));
routerContacts.post('/', validateBody(addContactsSchema), tryCatchWrapper(createContact));
routerContacts.delete('/:id', tryCatchWrapper(deleteContact));
// router.put('/:id', tryCatchWrapper(updateContact));

// routMovies.put('/1', (req, res) => {
// // update movie by id
//    res.status(200).json({ id: 1, name: "The Godfather" });
// });

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
