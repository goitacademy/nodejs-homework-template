const express = require('express');
const router = express.Router();

const { listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../../controllers/contacts/index');

const {
  addPostSchema,
  patchPostSchema
} = require('../../middlewares/validationMiddleware');


// GET contact list //
router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.send(contacts);
})

// GET contact by ID //
router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);

  if (contact) {
    return res.send(contact);
  }

  res.status(404).send({ message: 'Not found' });
})

// ADD contact to list //
router.post('/', async (req, res, next) => {
  const validation = await addPostSchema.validate(req.body);
  if (validation.error) {
    return res.send({ message: 'missing required name field' });
  }

  const contact = await addContact(req.body);
  res.status(201).send(contact);
})

//DELETE contact //
router.delete('/:contactId', async (req, res, next) => {
  
  if (await getContactById(req.params.contactId)) {
    removeContact(req.params.contactId);
    return res.send({ message: 'contact deleted' });
  }  
  res.status(404).send({ message: 'Not found' });
})

// UPDATE contact //
router.patch('/:contactId', async (req, res, next) => {
  const validation = patchPostSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({ message: 'missing required name field' }) 
  }

  const contactUpdate = await updateContact(req.params.contactId, req.body);
  
  res.send(contactUpdate);
})

module.exports = router
