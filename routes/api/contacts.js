const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Prosta baza danych w pamięci
let contacts = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-789' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', phone: '987-654-321' }
];

// Definiowanie schematu Joi dla walidacji danych wejściowych
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required()
});

// Funkcja pomocnicza do generowania unikalnego identyfikatora
const generateId = () => {
  return contacts.length + 1;
};

// Endpoint do pobierania wszystkich kontaktów
router.get('/', (req, res) => {
  res.json(contacts);
});

// Endpoint do pobierania konkretnego kontaktu
router.get('/:contactId', (req, res) => {
  const contactId = parseInt(req.params.contactId);
  const contact = contacts.find(c => c.id === contactId);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

// Endpoint do dodawania nowego kontaktu z walidacją
router.post('/', (req, res) => {
  try {
    // Walidacja danych wejściowych przy użyciu schematu Joi
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newContact = {
      id: generateId(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    };

    contacts.push(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint do usuwania kontaktu
router.delete('/:contactId', (req, res) => {
  const contactId = parseInt(req.params.contactId);
  const index = contacts.findIndex(c => c.id === contactId);

  if (index !== -1) {
    contacts.splice(index, 1);
    res.json({ message: 'Contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

// Endpoint do aktualizacji kontaktu
router.put('/:contactId', (req, res) => {
  const contactId = parseInt(req.params.contactId);
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    res.status(400).json({ message: 'Missing fields' });
    return;
  }

  const index = contacts.findIndex(c => c.id === contactId);

  if (index !== -1) {
    contacts[index] = {
      ...contacts[index],
      name: name || contacts[index].name,
      email: email || contacts[index].email,
      phone: phone || contacts[index].phone
    };
    res.json(contacts[index]);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

module.exports = router;