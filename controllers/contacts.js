// const contacts = require("../models/contacts");
const { Contact } = require("../models/contact");

const { NotFound } = require("http-errors");
const {
  addContactSchema,
  updContactSchema,
} = require("../middlewares/validateBody");

const ctrlWrapper = require("../helpers/ctrlWrapper");

const getAll = async (req, res) => {
  const contactsList = await contacts.listContacts();
  res.status(200).json(contactsList);
};

const getById = async (req, res) => {
  const id = req.params.contactId;

  const oneContact = await contacts.getContactById(id);
  if (!oneContact) {
    const message = new Error("Not found");
    message.status = 404;
    throw message;
  }
  res.status(200).json(oneContact);
};

const add = async (req, res) => {
  const body = req.body;
  const { error } = addContactSchema.validate(body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const newContact = await Contact.create(body);
  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const id = req.params.contactId;
  const deleteContact = await contacts.removeContact(id);
  if (!deleteContact) {
    throw new NotFound("Not found");
  }
  res.status(200).json({
    message: `Contact deleted`,
  });
};

const updateById = async (req, res) => {
  const body = req.body;
  const id = req.params.contactId;
  const { error } = updContactSchema.validate(body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const updContact = await contacts.updateContact(id, body);
  if (!updContact) {
    throw new NotFound();
  }
  res.status(200).json(updContact);
};

module.exports = {
  // getAll: ctrlWrapper(getAll),
  // getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  // deleteById: ctrlWrapper(deleteById),
  // updateById: ctrlWrapper(updateById),
};
