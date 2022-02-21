const contactsModel = require("../models/contacts");

const listContacts = async (req, res, next) => {
  const contacts = await contactsModel.listContacts();
  res.json({
    status: "success",
    code: 200,
    payload: { contacts },
  });
};

const getContactById = async (req, res, next) => {
  const contact = await contactsModel.getContactById(
    req.params.contactId
  );
  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      payload: { contact },
    });
  }
  return res.status(404).json({
    status: "error",
    code: 404,
    message: "Not Found",
  });
};

const addContact = async (req, res, next) => {
  const contact = await contactsModel.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    payload: { contact },
  });
};

const deleteContact = async (req, res, next) => {
  const contacts = await contactsModel.removeContact(
    req.params.contactId
  );
  if (contacts) {
    return res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  }
  return res.status(404).json({
    status: "error",
    code: 404,
    message: "Not Found",
  });
};

const updateContact = async (req, res, next) => {
  const contact = await contactsModel.updateContact(
    req.params.contactId,
    req.body
  );
  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      payload: { contact },
    });
  }
  return res.status(404).json({
    status: "error",
    code: 404,
    message: "Not Found",
  });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
};
