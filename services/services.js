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
  const updateContact = await model.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  });

  if (!updateContact) {
    throw new Error("This task does not exist");
  }

  return updateContact;
};

const removeContact = async (id) => {
  const updateContact = await model.findByIdAndRemove({ _id: id });

  if (!updateContact) {
    throw new Error("This task does not exist");
  }

  return updateContact;
};

const updateStatusContact = async (contactId, body) => {
  const dataContacts = await model.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });

  if (!dataContacts) throw new Error("Missing field favorite");

  return dataContacts;
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
