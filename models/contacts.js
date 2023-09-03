const Contact = require("../service/shemas/contacts");

const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    console.log("Error getting contact list", error);
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch (error) {
    console.log(`Error getting contact with id ${contactId}: `, error);
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const result = await Contact.findByIdAndDelete(contactId);
    return result !== null;
  } catch (error) {
    console.log(`Error removing contact with id ${contactId}: `, error);
    throw error;
  }
};

const addContact = async (body) => {
  try {
    return await Contact.create(body);
  } catch (error) {
    console.log("Error adding new contact: ", error);
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, body, { new: true });
  } catch (error) {
    console.log("an error occurred during updating the contact:", error);
    throw error;
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    const { favorite } = body;
    if (favorite === undefined) {
      throw new Error("Missing field favorite");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!updatedContact) {
      throw new Error("Not found");
    }

    return updatedContact;
  } catch (error) {
    console.log("an error occurred during updating the contact:", error);
    throw error;
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
