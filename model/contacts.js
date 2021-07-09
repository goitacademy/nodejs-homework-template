const contacts = require("./contacts.json");
const { v4 } = require("uuid");
const { updateContactsJson, contactScheme } = require("./helpers");

const listContacts = async (req, res) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const findContact = contacts.find(
    (item) => item.id.toString() === contactId.toString()
  );
  if (!findContact) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: findContact,
    },
  });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  const index = contacts.findIndex(
    (item) => item.id.toString() === contactId.toString()
  );

  console.log(index);
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }

  contacts.splice(index, 1);
  res.status(200).json({
    status: "success",
    code: 200,
    message: "contact deleted",
  });
};

const addContact = async (req, res) => {
  const { error } = contactScheme.validate(req.body);

  if (error) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `missing required ${error.details.map(
        (field) => field.path
      )} field`,
    });
  }

  const newContact = { id: v4(), ...req.body };
  contacts.push(newContact);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newContact,
    },
  });
  updateContactsJson(contacts);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const index = contacts.findIndex(
    (item) => item.id.toString() === contactId.toString()
  );
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Contact id not found",
    });
  }
  contacts[index] = { id: contactId, ...req.body };
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts[index],
    },
  });
  updateContactsJson(contacts);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
