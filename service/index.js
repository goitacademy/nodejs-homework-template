// service/index.js

const Contact = require("./models/contact");

const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

const getContactById = async (id) => {
  try {
    return await Contact.findOne({ _id: id });
  } catch (error) {
    console.error(`Error fetching contact with ID ${id}:`, error);
    throw error;
  }
};

const addContact = async (data) => {
  try {
    return await Contact.create(data);
  } catch (error) {
    console.error("Error adding contact:", error);
    throw error;
  }
};

const updateContact = async (id, fields) => {
  try {
    return await Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
  } catch (error) {
    console.error(`Error updating contact with ID ${id}:`, error);
    throw error;
  }
};

const removeContact = async (id) => {
  try {
    return await Contact.findByIdAndRemove({ _id: id });
  } catch (error) {
    console.error(`Error removing contact with ID ${id}:`, error);
    throw error;
  }
};

const updateStatusContact = async (id, fields) => {
  try {
    return await Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
  } catch (error) {
    console.error(`Error updating status for contact with ID ${id}:`, error);
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};