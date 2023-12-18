const Contact = require("./contact");
const mongoose = require("mongoose");

const listContacts = async () => {
  try {
    return await Contact.find();
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

const updateStatusContact = async (contactId, body) => {
  try {
    const objectIdContactId = mongoose.Types.ObjectId(contactId);

    console.log("Updating contact with ID:", contactId);
    console.log("Converted ObjectId:", objectIdContactId);
    console.log("Update body:", body);

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { $set: body },
      { new: true }
    );

    console.log("Updated contact:", updatedContact);

    return updatedContact;
  } catch (error) {
    console.error("Error updating contact status:", error);
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
