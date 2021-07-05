// const fs = require('fs/promises')
const contacts = require("./contacts.json");
const { v4 } = require("uuid");

const listContacts = async (req, res, next) => {
  await res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const selectedContact = contacts.find(
    (contact) => contact.id.toString() === contactId
  );
  if (!selectedContact) {
    return await res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  await res.json({
    status: "success",
    code: 200,
    data: {
      result: selectedContact,
    },
  });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  console.log(contactId);
  const index = contacts.findIndex(
    (contact) => contact.id.toString() === contactId
  );

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }

contacts.splice(index, 1)

  await res.status(200).json({
    status: "success",
    code: 200,
    message: "contact deleted",
    });
};


const addContact = async (req, res) => {
  const newContact = { id: v4(), ...req.body };
  contacts.push(newContact);
  await res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newContact,
    },
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  console.log(req.body);
  const index = contacts.findIndex(
    (contact) => contact.id.toString() === contactId
  );

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  if (req.body === {}) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing fields",
    });
  }

  contacts[index] = { ...contacts[index], ...req.body };
  await res.status(201).json({
    status: "success",
    code: 201,
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
