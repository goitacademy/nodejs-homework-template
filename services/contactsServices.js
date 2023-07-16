const { Contact } = require("../models/contact");

const listContactsService = async () => {
  return await Contact.find();
};

const getContactByIdService = async (contactId) => {
  return (await Contact.findById(contactId)) || null;
};

const addContactService = async (body) => {
  return await Contact.create(body);
};

const updateContactService = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, body);
};

const removeContactService = async (contactId) => {
  await Contact.findByIdAndDelete(contactId);

  return { message: "contact deleted" };
};

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
};
