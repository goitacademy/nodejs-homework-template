const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

const router = express.Router();

// Obtener la lista de contactos
router.get('/', async (req, res, next) => {
  try {
    const data = await listContacts();
    res.status(200).json({ data});
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Obtener un contacto por su ID
router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await getContactById(contactId);

    if (contact !== 'Contact not found') {
      res.status(200).json({ data: contact });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Agregar un nuevo contacto
router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;

  try {
    const result = await addContact({ name, email, phone });
    res.status(201).json({ message: result });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Eliminar un contacto por su ID
router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await removeContact(contactId);

    if (result === 'Contact removed successfully') {
      res.status(204).json({ message: result });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Actualizar un contacto por su ID
router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  try {
    const result = await updateContact(contactId, { name, email, phone });

    if (result === 'Contact updated successfully') {
      res.status(200).json({ message: result });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
