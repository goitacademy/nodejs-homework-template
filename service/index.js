const Contact = require("./schemas/contact");
const { ObjectId } = require("mongoose").Types;

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const createContact = ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite });
};

const updateContact = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};
const updateStatusContact = (id, favorite) => {
  const contactId = new ObjectId(id);
  return Contact.findByIdAndUpdate(
    contactId,
    { favorite: favorite },
    { new: true }
  );
};

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  updateStatusContact,
  removeContact,
};
