const Contact = require("../models/contactsModel");
const { validateContact } = require("../validators/contactsValidator");

const contactsService = {
  getContacts: () => {
    return Contact.find();
  },

  getContactById: (id) => {
    return Contact.findById(id);
  },

  addContact: (contactData) => {
    const { error } = validateContact(contactData);
    if (error) {
      throw new Error(error.details[0].message);
    }
    return Contact.create(contactData);
  },

  removeContact: (id) => {
    return Contact.findByIdAndRemove(id);
  },

  updateContact: (id, contactData) => {
    const { error } = validateContact(contactData);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const { name, email, phone } = contactData;
    return Contact.findByIdAndUpdate(id, { name, email, phone }, { new: true });
  },

  toggleFavorite: (contactId, favorite) => {
    return Contact.findByIdAndUpdate(
      contactId,
      { $set: { favorite } },
      { new: true }
    );
  },
};

module.exports = contactsService;
