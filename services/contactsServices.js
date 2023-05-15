const Contact = require("../models/contact");

function getContactsService() {
  return Contact.find();
}

const getContactService = (contactId) => {
  return Contact.findOne({ _id: contactId });
};

const addContactService = (newContact) => {
  return Contact.create(newContact);
};

const updateContactService = (contactId, updatedContact) => {
  return Contact.findOneAndUpdate({ _id: contactId }, updatedContact, {
    new: true,
  });
};

const updateStatusContactService = (contactId, field) => {
  return Contact.findOneAndUpdate({ _id: contactId }, field, { new: true });
};

const removeContactService = (contactId) => {
  return Contact.findByIdAndRemove(contactId);
};

module.exports = {
  getContactsService,
  getContactService,
  removeContactService,
  addContactService,
  updateContactService,
  updateStatusContactService,
};
