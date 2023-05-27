const Contact = require("../models/Contact");

const getContactsService = async () => {
  return await Contact.find();
};

const getContactService = async (id) => {
  const contact = await Contact.findById(id);
  return contact;
};

const createContactService = async (data) => {
  return await Contact.create(data);
};

const updateContactService = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (contact === -1) {
    return null;
  }
  return contact;
};

const updateStatusContactService = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (contact === -1) {
    return null;
  }
  return contact;
};

const deleteContactService = async (id) => {
  const contact = await Contact.findByIdAndDelete(id);
  if (contact === -1) {
    return null;
  }
  return id;
};

module.exports = {
  getContactsService,
  getContactService,
  createContactService,
  updateContactService,
  deleteContactService,
  updateStatusContactService,
};
