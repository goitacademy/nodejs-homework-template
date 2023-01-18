const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const { v4 } = require('uuid');
const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.string().min(3).max(30).required(),
});

// GET / api / contacts;
const listContacts = async (req, res, next) => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    const parsedContacts = JSON.parse(contacts);

    if (!parsedContacts.length) {
      console.log('no contacts');
      return res.status(404).json({ status: 'error', code: 404, message: 'no contacts found' });
    }

    res.json({
      message: 'Your list of contacts',
      status: 'success',
      code: 200,
      parsedContacts,
    });
    console.table(parsedContacts);
  } catch (err) {
    next(err);
  }
};

// GET /api/contacts/:id
const getContactById = async (req, res, next) => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    const parsedContacts = JSON.parse(contacts);

    const { contactId } = req.params;
    const contactById = parsedContacts.filter(el => el.id === contactId);

    if (!contactById.length) {
      const error = new Error(`contact by id=${contactId} not found`);
      error.status = 404;
      throw error;
    }

    res.json({
      message: `contact by id=${contactId}`,
      status: 'success',
      code: 200,
      contactById,
    });

    console.table(contactById);
  } catch (err) {
    next(err);
  }
};

// POST / api / contacts;
const addContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = 'missing required name field';
      throw error;
    }
    const contacts = await fs.readFile(contactsPath, 'utf8');
    const parsedContacts = JSON.parse(contacts);

    const { name, email, phone } = req.body;

    const newContact = { id: v4(), name, email, phone };
    parsedContacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts), 'utf-8');

    res.status(201).json({ message: `New contact add`, status: 'success', code: 201, newContact });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/contacts/:id
const removeContact = async (req, res, next) => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    const parsedContacts = JSON.parse(contacts);

    const { contactId } = req.params;

    const contactById = parsedContacts.filter(el => el.id === contactId);
    if (!contactById.length) {
      const error = new Error(`contact by id=${contactId} not found`);
      error.status = 404;
      throw error;
    }

    const contactsAfterRemove = parsedContacts.filter(contact => contact.id !== contactId);
    res.status(200).json({
      message: `contact deleted`,
      code: 200,
      contactsAfterRemove,
    });

    await fs.writeFile(contactsPath, JSON.stringify(contactsAfterRemove), 'utf-8');
  } catch (err) {
    next(err);
  }
};

// PUT /api/contacts/:id
const updateContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = 'missing required name field';
      throw error;
    }

    const { contactId } = req.params;

    const contacts = await fs.readFile(contactsPath, 'utf8');
    const parsedContacts = JSON.parse(contacts);

    const contactById = parsedContacts.filter(el => el.id === contactId);
    if (!contactById.length) {
      const error = new Error(`contact by id=${contactId} not found`);
      error.status = 404;
      throw error;
    }

    parsedContacts.forEach(contact => {
      if (contact.id === contactId) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;

        res.status(200).json({
          message: `updated contact by id=${contactId} `,
          code: 200,
          contact,
        });
      }
    });

    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts), 'utf-8');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
