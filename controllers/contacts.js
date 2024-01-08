const { Contact } = require('../models/contacts');

const { Error, wrapControler } = require('../funcHelpers');

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw Error(404, 'Not Found');
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    throw Error(404, 'Not Found');
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw Error(404, 'Not Found');
  }
  res.json({
    message: 'Contact deleted',
  });
};

const updateContactStatus = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    throw Error(404, 'Not Found');
  }
  res.json(result);
};

module.exports = {
  getAllContacts: wrapControler(getAllContacts),
  getContactById: wrapControler(getContactById),
  addContact: wrapControler(addContact),
  updateContact: wrapControler(updateContact),
  removeContact: wrapControler(removeContact),
  updateContactStatus: wrapControler(updateContactStatus),
};
