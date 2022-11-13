const Contacts = require("../services");

const getAllContact = async (_req, res, next) => {
  const contacts = await Contacts.getAll();
  res.json({
    status: "success",
    code: 200,
    message: "Contacts found",
    data: {
      contacts,
    },
  });
};

const getContactById = async (req, res, next) => {
  const contact = await Contacts.getContactById(req.params.contactId);

  res.json({
    status: "success",
    code: 200,
    message: "Contact found",
    data: {
      contact,
    },
  });
};

const addContact = async (req, res, next) => {
  const contact = await Contacts.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    message: "Contact created",
    data: {
      contact,
    },
  });
};

const updateContact = async (req, res, next) => {
  const contact = await Contacts.updateContact(req.params.contactId, req.body);

  res.json({
    status: "success",
    code: 200,
    message: "Contact updated",
    data: {
      contact,
    },
  });
};

const removeContact = async (req, res, next) => {
  const contact = await Contacts.removeContact(req.params.contactId);

  res.json({
    status: "success",
    code: 204,
    message: "Contact deleted",
    data: {
      contact,
    },
  });
};

module.exports = {
  getAllContact,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
