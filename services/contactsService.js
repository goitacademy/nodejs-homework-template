const Contact = require("../models/contactsModel");
const { validateContact } = require("../validators/contactsValidator");

const contactsService = {
  getContacts: (owner) => {
    return Contact.find({ owner });
  },

  getContactById: (id, owner) => {
    return Contact.findOne({ _id: id, owner });
  },

  getFavoriteContacts: (owner) => {
    return Contact.find({ owner, favorite: true });
  },

  addContact: (contactData, owner) => {
    const { error } = validateContact(contactData);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const newContact = { ...contactData, owner };
    return Contact.create(newContact);
  },

  removeContact: (id, owner) => {
    return Contact.findOneAndRemove({ _id: id, owner });
  },

  updateContact: (id, contactData, owner) => {
    const { error } = validateContact(contactData);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const { name, email, phone } = contactData;
    return Contact.findOneAndUpdate(
      { _id: id, owner },
      { name, email, phone },
      { new: true }
    );
  },

  toggleFavorite: (contactId, favorite, owner) => {
    return Contact.findOneAndUpdate(
      { _id: contactId, owner },
      { $set: { favorite } },
      { new: true }
    );
  },
};

module.exports = contactsService;
