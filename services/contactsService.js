const { v4: uuidv4 } = require('uuid');
const { Contact } = require('../models/contactsModel');

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
    // Verifica que data tenga al menos los campos mínimos requeridos
    if (!data.name || !data.email || !data.phone) {
      throw new Error('Name, email, and phone are required fields for a new contact.');
    }

    // Crea un nuevo contacto utilizando la información proporcionada en data
    return Contact.create({
      id: uuidv4(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      favorite: data.bolean
    });
  },

  findByIdAndUpdate: async (contactId, updateData, options) => {
    return Contact.findByIdAndUpdate(contactId, updateData, options);
  },
};

module.exports = { Contact, ContactsService };
