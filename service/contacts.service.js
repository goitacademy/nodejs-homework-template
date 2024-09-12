const Contact = require("../models/contacts.model");
const listContacts = async () => {
  try {
    const data = await Contact.find();
    return data;
  } catch (error) {
    throw new Error("Error reading contacts data");
  }
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new Error("Contact not found");
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contact = await Contact.findByIdAndDelete(contactId);

  if (!contact) {
    throw new Error("Contact not found");
  }
  return contact;
};

const addContact = async (name, email, phone, owner) => {
  try {
    const newContact = await Contact.create({
      name,
      email,
      phone,
      owner,
      favorite: false,
    });

    return newContact;
  } catch (error) {
    console.error("Error during contact addition:", error);
    throw error;
  }
};

const update = async (userId, contactId, body) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      { owner: userId, _id: contactId },
      body,
      {
        runValidators: true,
        new: true,
      }
    );

    if (!contact) {
      throw new Error("Contact not found");
    }

    return contact;
  } catch (error) {
    console.error("Error during contact update:", error);
    throw error;
  }
};

const updateFavoriteStatus = async (contactId, favorite) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { $set: { favorite } },
      { new: true }
    );

    return updatedContact;
  } catch (error) {
    console.error("Error during favorite contact status update:", error);
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  update,
  updateFavoriteStatus,
};
