const Contact = require("../service/schemas/schemaContacts");

const listContacts = async () => {
  try {
    return Contact.find();
  } catch (error) {
    console.error("Error occured when trying to show contacts:", error);
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    console.error("Error occured when trying to get contact:", error);
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const result = await Contact.findByIdAndRemove(contactId);
    return result;
  } catch (error) {
    console.error("Error occured when removing contact:", error);
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const newContact = await Contact.create(body);
    return newContact;
  } catch (error) {
    console.error("Error occured when adding contact:", error);
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    return updatedContact;
  } catch (error) {
    console.error("Error occurred when updating contact:", error);
    throw error;
  }
};

const updateFavorite = async (contactId, favorite) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    console.error("Error occured when updating contact:", error);
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
};
