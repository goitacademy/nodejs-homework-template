const express = require('express');
const router = express.Router();
const { contactSchema } = require('../../models/validation');
const { 
  listContacts, 
  getContactById, 
  addContact, 
  removeContact, 
  updateContact, 
  updateStatusContact 
} = require('../../models/contacts');
const authMiddleware = require('../../middleware/auth');

router.use(authMiddleware);

router.get('/', async (req, res, next) => {
  try {
    const userId = req.user._id;  
    const contacts = await listContacts(userId); 
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await getContactById(req.params.id, userId); 
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    
    const userId = req.user._id;
    const newContact = await addContact({ ...req.body, owner: userId });  
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const userId = req.user._id;
    const result = await removeContact(req.params.id, userId);
    if (!result) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (typeof favorite === 'undefined') {
      return res.status(400).json({ message: 'Missing field favorite' });
    }

    const userId = req.user._id;
    const updatedContact = await updateStatusContact(contactId, { favorite }, userId); 

    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const userId = req.user._id;
    const updatedContact = await updateContact(req.params.id, req.body, userId);

    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
