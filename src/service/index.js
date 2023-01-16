const Contact = require("./schemas/contacts");
const { UpdateStatusError } = require("../helpers/errors");

const getAllContacts = async () => {
  return Contact.find({});
};

const getContactById = (id) => {
  return Contact.findById(id);
};

const createContact = (body) => {
  const { name, phone, email, favorite } = body;
  return Contact.create({ name, phone, email, favorite });
};

const updateContact = (id, body) => {
  const { name, phone, email } = body;
  return Contact.findByIdAndUpdate(id, { name, phone, email }, { new: true });
};

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

const updateStatusContact = (id, { favorite }) => {
  console.log(favorite);
  if (favorite === undefined) {
    throw new UpdateStatusError("Not found");
  }

  return Contact.findByIdAndUpdate(id, { favorite }, { new: true });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
