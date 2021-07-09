const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const contactSchema = require("../utils/validate/contacts");

const contacts = require("./contacts.json");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = (req, res) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const getContactById = (req, res) => {
  const { contactId } = req.params;
  const selectContact = contacts.find(({ id }) => id.toString() === contactId);
  if (!selectContact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Contact with this id not found",
    });
    return;
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: selectContact,
    },
  });
};

const removeContact = (req, res) => {
  const { contactId } = req.params;
  const index = contacts.findIndex(({ id }) => id.toString() === contactId);
  if (index === -1) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
    return;
  }
  const newContacts = contacts.filter(({ id }) => id.toString() !== contactId);

  fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
    err && console.log(err.message);
  });

  res.status(200).json({
    status: "success",
    code: "200",
    message: "No Content",
  });
};

const addContact = (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
    return;
  }
  const newContact = { id: v4(), ...req.body };
  contacts.push(newContact);

  fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
    err && console.log(err.message);
  });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newContact,
    },
  });
};

const updateContact = (req, res) => {
  const { contactId } = req.params;
  const { error } = contactSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
  const index = contacts.findIndex(({ id }) => id.toString() === contactId);
  if (index === -1) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
    return;
  }
  contacts[index] = { id: contactId, ...req.body };

  fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
    err && console.log(err.message);
  });

  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts[index],
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
