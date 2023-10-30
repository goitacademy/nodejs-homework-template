const { v4: uuidv4 } = require("uuid");
let contacts = require("./contacts.json");

const listContacts = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `contact with id=${contactId} not found`,
    });
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = contacts.find((item) => item.id === contactId);
  contacts = contacts.filter((contact) => contact.id !== contactId);

  if (!result) {
    res.status(400).json({
      status: "Not Found",
      code: 400,
    });
  }
  res.status(201).json({
    status: "success",
    code: 201,
    result: result,
  });
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  contacts.push({
    id: uuidv4(),
    name,
    email,
    phone,
  });
  res.json({
    status: "success",
    code: 201,
    result: contacts,
  });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const result = contacts.find((item) => item.id === contactId);
  contacts.forEach((contact) => {
    if (result) {
      contact.email = email;
      contact.name = name;
      contact.phone = phone;

      res.status(201).json({
        status: "success",
        code: 201,
        result: result,
      });
    }
    res.status(400).json({
      status: "error",
      code: 400,
    });
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
