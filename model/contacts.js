// const fs = require('fs/promises');
// const path = require('path');
const contacts = require('./contacts.json');
const { v4 } = require('uuid');
const { updateContactsJson, contactScheme } = require('./helpers')
// const Joi = require('joi');

// const contactsPath = path.join(__dirname, 'contacts.json');

// const updateContactsJson = async contacts => {
//   const str = JSON.stringify(contacts);
//   await fs.writeFile(contactsPath, str);
// };

// const contactScheme = Joi.object({
//   name: Joi.string().min(2).required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().min(2).required(),
// });

const listContacts = async (req, res, next) => {
  await res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const selectedContact = contacts.find(
    contact => contact.id.toString() === contactId,
  );
  if (!selectedContact) {
    return await res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    });
  }
  await res.json({
    status: 'success',
    code: 200,
    data: {
      result: selectedContact,
    },
  });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  const index = contacts.findIndex(
    contact => contact.id.toString() === contactId,
  );

  if (index === -1) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    });
  }

  contacts.splice(index, 1);

  await res.status(200).json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
  });
  updateContactsJson(contacts);
};

const addContact = async (req, res) => {
  const { error } = contactScheme.validate(req.body);
  if (error) {
    await res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message,
    });
  }
  const newContact = { id: v4(), ...req.body };
  contacts.push(newContact);

  await res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result: newContact,
    },
  });
  updateContactsJson(contacts);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const index = contacts.findIndex(
    contact => contact.id.toString() === contactId,
  );
  if (!name && !email && !phone) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'missing fields',
    });
  }

  if (index === -1) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    });
  }

  contacts[index] = { ...contacts[index], ...req.body };
  await res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result: contacts[index],
    },
  });
  updateContactsJson(contacts);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
