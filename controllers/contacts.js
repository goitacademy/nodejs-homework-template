const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

//  controllers

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();

  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);

  //  перевірка чи є такий контакт
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);

  // щоб отримати об'єкт з 4-ма властивостями
  const response = {
    id: result.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  res.status(201).json(response);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);

  // якщо немає такого користувача
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    message: "contact deleted",
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);

  // якщо немає такого користувача
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
