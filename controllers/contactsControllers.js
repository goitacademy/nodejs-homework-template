const contacts = require("../models/contacts");

// const { HttpError } = require("../helpers/HttpError");

const ctrlWrapper = require("../decorators/ctrl.Wrapper");

const contactAddSchema = require("../schemas/contacts");

const listContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    return res.status(400).json({
      message: "Missing field",
    });
  }

  if (!name) {
    return res.status(400).json({
      message: "Missing required name field",
    });
  }

  if (!email) {
    return res.status(400).json({
      message: "Missing required email field",
    });
  }

  if (!phone) {
    return res.status(400).json({
      message: "Missing required phone field",
    });
  }

  try {
    const newContact = await contacts.addContact(name, email, phone);

    res.status(201).json({
      id: newContact.id,
      name: newContact.name,
      email: newContact.email,
      phone: newContact.phone,
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;

  if (!contactId) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  const result = await contacts.removeContact(contactId);

  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({
    message: "contact deleted",
  });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    return res.status(400).json({
      message: "Missing field",
    });
  }

  if (!name) {
    return res.status(400).json({
      message: "Missing required name field",
    });
  }

  if (!email) {
    return res.status(400).json({
      message: "Missing required email field",
    });
  }

  if (!phone) {
    return res.status(400).json({
      message: "Missing required phone field",
    });
  }

  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const updatedContact = await contacts.updateContact(contactId, {
      name,
      email,
      phone,
    });

    if (!updatedContact) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    return res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
