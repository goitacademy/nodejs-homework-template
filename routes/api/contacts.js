const express = require('express');

const router = express.Router();

const {
  getAllContacts,
  createContact,
  getContactById,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require('../.././services/index');

const {
  schemaAdd,
  schemaUpdate,
} = require('../.././schemas/contacts-validation');

router.get('/', async (req, res, next) => {
  try {
    const contactsList = await getAllContacts();

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
    res.status(404).json({ message: 'Contact not found' });
  }
});

router.post('/', async (req, res, next) => {
  const { error } = schemaAdd.validate(req.body);

  if (error) {
    res.status(400).json({ message: 'missing required name field' });
  }

  const newContact = await createContact(req.body);

  res.status(201).json(newContact);
});

router.delete('/:id', async function (req, res, next) {
  try {
    await deleteContact(req.params.id);

    res.status(203).json({ message: 'contact deleted' });
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;

    const { error } = schemaUpdate.validate(req.body);

    if (error) {
      res.status(400).json({ message: 'missing fields' });
    }
    const updatedContact = await updateContact(
      req.params.id,
      name,
      email,
      phone,
      favorite,
    );

    res.json(updatedContact);
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
});

router.patch('/:id/favorite', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite = false } = req.body;
    const { error } = schemaUpdate.validate(req.body);

    if (error) {
      res.status(400).json({ message: 'missing field favorite' });
    }

    const updatedFavoriteStatusInContact = await updateStatusContact(id, {
      favorite,
    });

    res.status(200).json(updatedFavoriteStatusInContact);
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
});

module.exports = router;
