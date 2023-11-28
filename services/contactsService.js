
const { v4: uuidv4 } = require('uuid');
const { Contact } = require('./contacts-db');

const ContactsService = {
  find: async () => {
    return Contact.find();
  },

  findById: async (contactId) => {
    return Contact.findById(contactId);
  },

  findByIdAndDelete: async (contactId) => {
    return Contact.findByIdAndDelete(contactId);
  },

  create: async (data) => {
    return Contact.create({
      id: uuidv4(),  
    });
  },

  findByIdAndUpdate: async (contactId, updateData, options) => {
    return Contact.findByIdAndUpdate(contactId, updateData, options);
  },
};

module.exports = { Contact, ContactsService };
