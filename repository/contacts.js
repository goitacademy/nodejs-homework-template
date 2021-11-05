const Contact = require("../model/contact");

const listContacts = async () => {
  const result = await Contact.find({});
  return result;
};

const getContactById = async (id) => {
  const result = await Contact.findById(id);
  return result;
};

const removeContact = async (id) => {
  const result = await Contact.findOneAndRemove({ _id: id });
  return result;
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (id, body) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
