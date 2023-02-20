// const {
//   addContact,
//   listContacts,
//   getContactById,
//   removeContact,
//   updateContact,
// } = require("../models/contacts");

const contactsModel = require("../models/contacts");

const getContacts = async (req, res) => {
  const contactsList = await contactsModel.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: contactsList,
  });
};

const getContactById = async (req, res) => {
  console.log("in the fn");
  const contact = await contactsModel.getContactById(req.params.contactId);

  if (!contact) {
    res.status(404);
    throw new Error("Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: contact,
  });
};

const addContact = async (req, res) => {
  const newContact = await contactsModel.addContact(req.body);
  res.json({
    status: "created",
    code: 201,
    data: newContact,
  });
};

const removeContact = async (req, res) => {
  const removeResult = await contactsModel.removeContact(req.params.contactId);

  if (!removeResult) {
    res.status(404);
    throw new Error("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
  });
};

const updateContact = async (req, res) => {
  const updatedContact = await contactsModel.updateContact(
    req.params.contactId,
    req.body
  );

  if (!updatedContact) {
    res.status(404);
    throw new Error("Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: updatedContact,
  });
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
