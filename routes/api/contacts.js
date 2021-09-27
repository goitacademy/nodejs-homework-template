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
  const contacts = await listContacts;
  res.json(contacts);
})

// GET contact by ID //
router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params);

  // res.json(req.params);
  if (contact) {
    return res.json(contact);
  }

  res.status(404).json({ message: 'Not found' });
})

// ADD contact to list //
router.post('/', async (req, res, next) => {
  const validation = addPostSchema.validate(req.body);

  if (validation.error) {
    return res.json({ message: 'missing required name field' });
  }

  const contact = await addContact(req.body);
  res.status(201).json(contact);
})

//DELETE contact //
router.delete('/:contactId', async (req, res, next) => {
  
  if (await getContactById(req.params.id)) {
    removeContact(req.params.id);
    return res.json({ message: 'contact deleted' });
  }  
  res.status(404).json({ message: 'Not found' });
})

// UPDATE contact //
router.patch('/:contactId', async (req, res, next) => {
  const validation = patchPostSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({ message: 'missing required name field' }) 
  }

  const contactUpdate = updateContact(req.params.id, req.body);
  
  res.json(contactUpdate);
})

module.exports = router
