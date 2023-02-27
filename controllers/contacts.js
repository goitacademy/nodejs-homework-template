const { Contact } = require('../../models/contact');

const { HttpError } = require('../../routes/api/helpers');

const listContacts = async (req, res, next) => {
  const contact = Contact.find({});
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contact,
    },
  });
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (!contact) {
    return res.status(400).json({
      status: 'Not found',
    });
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: result,
    },
  });
};

const addContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, 'Not found');
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
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
