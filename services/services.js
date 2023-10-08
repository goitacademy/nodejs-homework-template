const model = require("../models/contacts");

const listContacts = async () => {
  return await model.find();
};

const getById = async (id) => {
  return await model.findById(id);
};

const addContact = async (body) => {
  const newContact = await model.create({ ...body });

  if (!newContact) throw new Error();

  return newContact;
};

const updateContact = async (id, body) => {
  return await model.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  });
};

const removeContact = async (id) => {
  return await model.findByIdAndRemove({ _id: id });
};

const updateStatusContact = async (contactId, body) => {
  return await model.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

const serviceContact = {
  listContacts,
  getById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};

module.exports = {
  serviceContact,
};
