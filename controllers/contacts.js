const { Contact } = require("../models/contact");

const { HttpError } = require("../helpers/index");

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const addContact = async (req, res, next) => {
  const { email } = req.body;

  const checkContactOnEmail = await Contact.find({ email });

  if (checkContactOnEmail.length === 1) {
    return res.status(200).json({ message: "This email have in database." });
  }

  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  return { message: "Contact deleted" };
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId.slice(1), req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateStatusContact,
};
