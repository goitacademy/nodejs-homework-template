const CreateError = require('http-errors');
const { Contact } = require('../models');

const listContacts = async (req, res) => {
  const { page = 1, limit = 2 } = req.query;
  const skip = (page - 1) * limit;
  const { _id } = req.user;
  const contacts = await Contact.find({ owner: _id }, '_id', {
    skip,
    limit: +limit,
  }).populate('owner', 'email');
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts,
    },
  });
};

const getById = async (req, res) => {
  const { _id } = req.params;
  const contactId = req.params.contactId;
  const contact = await Contact.findById({ _id: contactId, owner: _id });
  if (!contact) {
    throw new CreateError(404, `Prooduct with id=${contactId} not found`);
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id };
  const result = await Contact.create(newContact);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw new CreateError(404, `Prooduct with id=${id} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Success delete',
  });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw new CreateError(404, `Product with id=${id} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw new CreateError(404, 'missing field favorite');
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = {
  listContacts,
  getById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
