// const fs = require('fs/promises')
const contacts = require('./contacts.json')
const { v4 } = require('uuid');
const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().min(1).required(),
  phone: Joi.number().min(0).required(),
})

const listContacts = async (req, res, next) => {
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  });
  next();
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const selectContacts = contacts.find((item) => item.id === Number(contactId));
  if (!selectContacts) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Contact with this id not found'
    })
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: selectContacts,
    },
  });
}

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const index = contacts.findIndex((item) => item.id === Number(contactId));
  if (index === -1) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    });
  }

  contacts.splice(index, 1);

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'No Content',
    data: {
      result: contacts,
    },
  });
}

const addContact = async (req, res) => {
  const { error } = contactsSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message
    })
  }
  const newContact = { ...req.body, id: v4() };
  contacts.push(newContact);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result: newContact,
    },
  });
}

const updateContact = async (req, res) => {
  const { error } = contactsSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message,
    });
  }
  const { contactId } = req.params;
  const index = contacts.findIndex((item) => item.id === Number(contactId));
  if (index === -1) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    });
  }
  contacts[index] = { ...req.body, id: contactId };
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts[index]
    },
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
