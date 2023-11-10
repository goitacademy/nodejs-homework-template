const express = require('express');
const fs = require('fs').promises; 
const path = require('path');
const Joi = require('joi');
const router = express.Router();

// Obtener la ruta absoluta del archivo 'contacts.json'
const contactsFilePath = path.join(__dirname, 'contacts.json');

// Función para cargar los datos desde contacts.json
async function loadContacts() {
  try {
    const data = await fs.readFile(contactsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Si el archivo no se encuentra, devuelve un array vacío
    return [];
  }
}

// Función para guardar los datos en contacts.json
async function saveContacts(contacts) {
  await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2), 'utf8');
}

// Middleware para validar el cuerpo de la solicitud
function validateContact(contact) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  return schema.validate(contact);
}

// Cargar contactos iniciales
let contacts;

// Ruta para obtener todos los contactos
router.get('/', async (req, res) => {
  contacts = await loadContacts();
  res.json(contacts);
});

// Ruta para obtener un contacto por ID
router.get('/:id', async (req, res) => {
  contacts = await loadContacts();
  const contactId = req.params.id;
  const contact = contacts.find((c) => c.id === parseInt(contactId));

  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.json(contact);
});

// Ruta para agregar un nuevo contacto
router.post('/', async (req, res) => {
  contacts = await loadContacts();
  const { error } = validateContact(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newContact = {
    id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  contacts.push(newContact);
  await saveContacts(contacts);
  res.status(201).json(newContact);
});

// Ruta para eliminar un contacto por ID
router.delete('/:id', async (req, res) => {
  contacts = await loadContacts();
  const contactId = req.params.id;
  const contactIndex = contacts.findIndex((c) => c.id === parseInt(contactId));

  if (contactIndex === -1) {
    return res.status(404).json({ message: 'Not found' });
  }

  contacts.splice(contactIndex, 1);
  await saveContacts(contacts);
  res.json({ message: 'Contact deleted' });
});

// Ruta para actualizar un contacto por ID
router.put('/:id', async (req, res) => {
  contacts = await loadContacts();
  const contactId = req.params.id;
  const contactIndex = contacts.findIndex((c) => c.id === parseInt(contactId));

  if (contactIndex === -1) {
    return res.status(404).json({ message: 'Not found' });
  }

  const { error } = validateContact(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  contacts[contactIndex] = {
    id: contacts[contactIndex].id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  await saveContacts(contacts);
  res.json(contacts[contactIndex]);
});

module.exports = router;
