const Contact = require("../models/contact");
const contacts = require("../models/contacts.json");

const listContacts = async (page = 1, limit = 20, query = {}) => {
  try {
    const skip = (page - 1) * limit;
    return await Contact.find(query).skip(skip).limit(limit);
  } catch (error) {
    console.error("Error listing contacts:", error);
    return [];
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch (error) {
    console.error("Error getting contact by ID:", error);
    return null;
  }
};

const removeContact = async (contactId) => {
  try {
    const result = await Contact.deleteOne({ _id: contactId });
    return result.deletedCount > 0;
  } catch (error) {
    console.error("Error removing contact:", error);
    return false;
  }
};

const addContact = async (body) => {
  try {
    return await Contact.create(body);
  } catch (error) {
    console.error("Error adding contact:", error);
    return null;
  }
};

const updateContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    return null;
  }
};

async function updateStatusContact(contactId, body) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: body.favorite },
      { new: true }
    );

    return updatedContact;
  } catch (error) {
    throw new Error("Contact not found");
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
