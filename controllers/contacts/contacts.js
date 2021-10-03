const { NotFound, BadRequest } = require('http-errors');

const { Contact } = require('../../models/contacts');

const listContacts = async (_, res) => {
  const contacts = await Contact.find();
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts
    }
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findOne({ _id: contactId });
  if (!contact) {
    throw new NotFound(`Product with id ${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    contact
  });
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result
    }
  })
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove({ _id: contactId });
  if (!result) {
    throw new NotFound(`Product with id ${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted'
  });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw new NotFound(`Product with id ${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (typeof favorite === 'undefined') {
    throw new BadRequest('missing field favorite');
  }
  const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
  if (!result) {
    throw new NotFound(`Product with id ${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateById,
  updateStatusContact,
};
