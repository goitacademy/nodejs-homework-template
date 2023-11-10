const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const Joi = require('joi');
const fs = require('fs').promises;
const path = require('path');
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Obtener la ruta absoluta del archivo 'contacts.json'
const contactsFilePath = path.join(__dirname, 'contacts.json');

// Middleware para validar el cuerpo de la solicitud
function validateContact(contact) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  return schema.validate(contact);
}

// Ruta para obtener todos los contactos
app.get('/api/contacts', async (req, res) => {
  try {
    const contactsData = await fs.readFile(contactsFilePath, 'utf8');
    const contacts = JSON.parse(contactsData);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Ruta para obtener un contacto por ID
app.get('/api/contacts/:id', async (req, res) => {
  try {
    const contactsData = await fs.readFile(contactsFilePath, 'utf8');
    const contacts = JSON.parse(contactsData);
    const contactId = req.params.id;
    const contact = contacts.find((c) => c.id === parseInt(contactId));

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Ruta para agregar un nuevo contacto
app.post('/api/contacts', async (req, res) => {
  try {
    const { error } = validateContact(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    const contactsData = await fs.readFile(contactsFilePath, 'utf8');
    const contacts = JSON.parse(contactsData);

    const newContact = {
      id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };

    contacts.push(newContact);

    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2), 'utf8');
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para eliminar un contacto por ID
app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const contactsData = await fs.readFile(contactsFilePath, 'utf8');
    const contacts = JSON.parse(contactsData);

    const contactId = req.params.id;
    const contactIndex = contacts.findIndex((c) => c.id === parseInt(contactId));

    if (contactIndex === -1) {
      return res.status(404).json({ message: 'Not found' });
    }

    contacts.splice(contactIndex, 1);

    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2), 'utf8');
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Ruta para actualizar un contacto por ID
app.put('/api/contacts/:id', async (req, res) => {
  try {
    const contactsData = await fs.readFile(contactsFilePath, 'utf8');
    const contacts = JSON.parse(contactsData);

    const contactId = req.params.id;
    const contactIndex = contacts.findIndex((c) => c.id === parseInt(contactId));

    if (contactIndex === -1) {
      throw new Error('Not found');
    }

    const { error } = validateContact(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    contacts[contactIndex] = {
      id: contactId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };

    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2), 'utf8');
    res.json(contacts[contactIndex]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Maneja las rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Inicia el servidor en un puerto específico
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on http://localhost:3000${port}`);
});
