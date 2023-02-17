const { ContactsList } = require("./contactsSchema");
const { HttpError } = require("../../helpers/HttpError");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;

  const list = await ContactsList.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  return list;
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await ContactsList.findById(contactId).populate(
    "owner",
    "name email"
  );
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  return contact;
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await ContactsList.findByIdAndRemove(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  return {
    message: "Delete success",
  };
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;

  const newContact = await ContactsList.create({ ...req.body, owner });
  return newContact;
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const contact = await ContactsList.findByIdAndUpdate(contactId, req.body, {
    new: true,
  }).populate("owner", "name email");
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  return contact;
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const contact = await ContactsList.findByIdAndUpdate(contactId, req.body, {
    new: true,
  }).populate("owner", "name email");
  if (!contact) {
    throw HttpError(404, `Not found`);
  }
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
};
