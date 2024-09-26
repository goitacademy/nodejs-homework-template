const { ctrlWrapper } = require("../helpers");
const contactsOperations = require("../models/contacts");
const { HttpError } = require("../helpers");

const getContactsList = async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  res.json({
    status: "Success",
    code: 200,
    data: {
      contacts,
    },
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.getContactById(contactId);
  if (!contact) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json({
    status: "Success",
    code: 200,
    data: {
      contact,
    },
  });
};

const addContact = async (req, res) => {
  const contact = await contactsOperations.addContact(req.body);
  res.status(201).json({
    status: "Success",
    code: 201,
    data: {
      contact,
    },
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.updateContact(contactId, req.body);
  if (!contact) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json({
    status: "Success",
    code: 200,
    message: "Contact updated",
    data: {
      contact,
    },
  });
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.removeContact(contactId);
  if (!contact) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json({
    status: "Success",
    code: 200,
    message: "Contact deleted",
    data: {
      contact,
    },
  });
};

module.exports = {
  getContactsList: ctrlWrapper(getContactsList),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};