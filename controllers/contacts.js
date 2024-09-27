const HttpError = require("../helpers");
const Contact = require("../models/contacts/contacts");

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404, "Not Found");
  res.status(200).json(result);
};

const listContacts = async () => {
  const res = await Contact.find();
  return res;
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "missing field favorite");
  }
  res.json({
    message: "contact deleted",
  });
};

const updateContact = async (id, body) => {
  const result = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  return result;
};

const updateFavourite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.status(200).json(result);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  updateContact,
  updateFavourite,
  updateContactById,
};
