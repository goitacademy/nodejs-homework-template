// app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./db'); // Додано підключення до бази даних
const authRoutes = require('./auth');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,// Додано нову функцію
} = require('./contacts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('combined'));
app.use(cors());

// Підключення до бази даних
connectDB();

// Роути для автентифікації
app.use('/api/users', authRoutes);

// Роути для контактів
// eslint-disable-next-line no-undef
app.use('/api/contacts', contactsRoutes);

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

// Роутер для оновлення статусу контакту
app.patch('/api/contacts/:id/favorite', async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  // Перевірка наявності обов'язкового поля favorite
  if (favorite === undefined) {
    return res.status(400).json({ message: 'missing field favorite' });
  }

  try {
    const updatedContact = await updateStatusContact(id, { favorite });

    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(updatedContact);
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