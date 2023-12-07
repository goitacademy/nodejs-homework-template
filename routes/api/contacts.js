const express = require('express');
const router = express.Router();
const uuid = require('uuid').v4; 

const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts');
const joi = require('joi');

// Валідація для POST та PUT запитів
const validateContact = (contact) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    phone: joi.string().required(),
  });

  return schema.validate(contact);
};

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.status(200).json(contacts);

  } catch (error) {

    res.status(404).json({ message: 'List Not found' });
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const foundContact = await getContactById(contactId);

    if (foundContact) {
      res.status(200).json(foundContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = validateContact(req.body);

    // Перевірка наявності помилок валідації
    if (error) {
      return res.status(400).json({ message: 'missing required name field'});
    }

    // if (!name || !email || !phone) {
    //   return res.status(400).json({ message: 'missing required name field' });
    // }

    const id = uuid();
    const newContact = { id, name, email, phone };

    await addContact(newContact);

    res.status(201).json(newContact);

  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contactToDelete = await removeContact(contactId);

    if (contactToDelete) {
      res.status(200).json({ message: 'contact deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const { error } = validateContact(req.body);

    // Перевірка наявності помилок валідації
    if (error) {
      return res.status(400).json({ message: 'Missing fields'});
    }

    // if (!name && !email && !phone) {
    //   return res.status(400).json({ message: 'Missing fields' });
    // }

    const result = await updateContact(contactId, { name, email, phone });

    if (result.status === 200) {
      res.status(200).json(result.contact);
    } else {
      res.status(result.status).json({ message: 'update Not found', status:  result.status});
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
