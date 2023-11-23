// app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { listContacts, getContactById, addContact, removeContact, updateContact, validateContact } = require('./contacts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('combined'));
app.use(cors());

// Роути
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/contacts', async (req, res) => {
  const { name, email, phone } = req.body;

  // Використовую validateContact для перевірки даних
  const validationResult = validateContact({ name, email, phone });

  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.message });
  }

  try {
    const newContact = await addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await removeContact(id);
    if (result) {
      res.status(200).json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.put('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  // Використовую validateContact для перевірки даних
  const validationResult = validateContact({ name, email, phone });

  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.message });
  }

  try {
    const updatedContact = await updateContact(id, { name, email, phone });
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
