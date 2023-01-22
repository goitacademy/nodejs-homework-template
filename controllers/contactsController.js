const contactsOperations = require("../models/contacts");
const schems = require("../schemas/schemas");

const allContacts = async (req, res, next) => {
  const contacts = await contactsOperations.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const contactById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsOperations.getContactById(id);
  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
    return;
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

const addContact = async (req, res, next) => {
  const { error } = schems.validate(req.body);

  if (error) {
    res.status(400).json(error.message);
    return;
  }

  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing required name field",
    });
    return;
  }

  const newContact = await contactsOperations.addContact(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newContact,
    },
  });
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  await contactsOperations.removeContact(id);
  res.json({
    status: "success",
    code: 200,
  });
  if (!id) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
};

const updateContact = async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing fields",
    });
    return;
  }

  const { error } = schems.validate(req.body);
  if (error) {
    res.status(400).json(error.message);
    return;
  }

  const { id } = req.params;
  const contact = await contactsOperations.updateContact(id, req.body);
  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: contact,
    },
  });
};

module.exports = {
  allContacts,
  contactById,
  addContact,
  deleteContact,
  updateContact,
};
