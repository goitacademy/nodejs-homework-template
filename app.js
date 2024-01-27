const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/contacts', authMiddleware, contactsRouter);
app.use(auth(config));


const contactsPath = path.join(__dirname, 'contacts.json');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: 'http://localhost:3000',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_DOMAIN
};

const readContactsFile = () => {
    const data = fs.readFileSync(contactsPath, 'utf8');
    return JSON.parse(data);
};

const writeContactsFile = (data) => {
    fs.writeFileSync(contactsPath, JSON.stringify(data, null, 2), 'utf8');
};


app.get('/api/contacts', (req, res) => {
    try {
        const contacts = readContactsFile();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/contacts/:id', (req, res) => {
    try {
        const contacts = readContactsFile();
        const contact = contacts.find(c => c.id === req.params.id);
        if (contact) {
            res.json(contact);
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/contacts', (req, res) => {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'missing required fields' });
        }
        const contacts = readContactsFile();
        const newContact = { id: Date.now().toString(), name, email, phone };
        contacts.push(newContact);
        writeContactsFile(contacts);
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Получить список всех контактов
router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsController.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

// Получить контакт по ID
router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await contactsController.getContactById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

// Добавить новый контакт
router.post('/', async (req, res, next) => {
  try {
    const newContact = await contactsController.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// Удалить контакт по ID
router.delete('/:contactId', async (req, res, next) => {
  try {
    const deletedContact = await contactsController.removeContact(req.params.contactId);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(204).end(); // No content to send back
  } catch (error) {
    next(error);
  }
});

// Обновить контакт по ID
router.put('/:contactId', async (req, res, next) => {
  try {
    const updatedContact = await contactsController.updateContact(req.params.contactId, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
