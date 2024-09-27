const contacts = require("../models/contacts");

const { HttpErr, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpErr(404, "Not found!");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpErr(404, "Not found!");
  }
  res.json(result);
  // const phoneRegex = /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/;
  // const phone = phoneRegex;
};

// function validatePhoneNumber(phone) {
//   const phoneRegex = /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/;

// Проверяем соответствие номера телефона регулярному выражению
// return phoneRegex.test(phoneNumber);
// }
// const phone = "+1-123-456-7890";
// if (validatePhoneNumber(phone)) {
//   console.log("Номер телефона верный");
// } else {
//   console.log("Номер телефона неверный");
// }

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpErr(404, "Not found!");
  }
  res.json({
    message: "Delete success!",
  });
};
module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
};
