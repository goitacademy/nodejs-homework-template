const methods = require("../models/contacts");

const getContactList = async (req, res, next) => {
  const contacts = await methods.listContacts();

  res.json({
    status: "success",
    data: {
      contacts,
    },
  });
};

const getContactsById = async (req, res, next) => {
  const contacts = await methods.getContactById(req.params.contactId);
  if (contacts) {
    res.json({
      status: "success",
      contacts,
    });
  }
  res.status(404).json({
    status: "error",
    message: `Contact with id - ${req.params.contactId} not found!`,
  });
};

const addContactById = async (req, res, next) => {
  const db = await methods.addContact(req.body);

  return res.status(201).json({
    status: "success",
    data: db,
  });
};

const deleteContactById = async (req, res, next) => {
  const db = await methods.removeContact(req.params.contactId);
  if (db) {
    res.json({
      message: `contact with id - ${req.params.contactId} deleted`,
      contact: db,
    });
  }
  res.status(404).json({
    message: `contact with id - ${req.params.contactId} not found`,
  });
};

const updateContactById = async (req, res, next) => {
  const db = await methods.updateContact(req.params.contactId, req.body);
  if (!db) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });
  }
  res.json({
    status: "success",
    updateContact: db,
  });
};
module.exports = {
  getContactList,
  getContactsById,
  addContactById,
  deleteContactById,
  updateContactById,
};
