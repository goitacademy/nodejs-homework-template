const express = require('express');

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../.././models/contacts');

const {
  schemaAdd,
  schemaUpdate,
} = require('../.././schemas/contacts-validation');

router.get('/', async (req, res, next) => {
  try {
    const contactsList = await listContacts();

    res.json(contactsList);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const contactById = await getContactById(req.params.id);

    res.json(contactById);
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = schemaAdd.validate(req.body);

  if (error) {
    res.status(400).json({ message: 'missing required name field' });
  }

  const newContact = await addContact(name, email, phone);

  res.status(201).json(newContact);
});

router.delete('/:id', async function (req, res, next) {
  try {
    await removeContact(req.params.id);

    res.json({ message: 'contact deleted' });
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    const { error } = schemaUpdate.validate(req.body);

    if (error) {
      res.status(400).json({ message: 'missing fields' });
    }
    const updatedContact = await updateContact(
      req.params.id,
      name,
      email,
      phone,
    );

    res.json(updatedContact);
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
});

module.exports = router;
