const { Contact } = require("../Schemas/contactSchema");

const listContacts = async (owner) => {
  try {
    const contacts = await Contact.find({ owner });
    return contacts;
  } catch (err) {
    throw Error(err);
  }
};

const getContactById = async (contactId, userId) => {
  try {
    const contactToFind = await Contact.findOne({ _id: contactId });
    if (userId !== contactToFind.owner) {
      throw Error("Not found in your contacts!");
    }
    return contactToFind;
  } catch (err) {
    throw Error(err);
  }
};

const removeContact = async (contactId, userId) => {
  try {
    const contactToDelete = await Contact.findByIdAndDelete({ _id: contactId });
    if (contactToDelete.owner !== userId) {
      throw Error("Not found in your contacts!");
    }
    return contactToDelete;
  } catch (err) {
    throw Error(err);
  }
};

const addContact = async (contact) => {
  try {
    const newContact = await Contact.create(contact);
    return newContact;
  } catch (err) {
    throw Error(err);
  }
};

const updateContact = async (contactId, body, userId) => {
  try {
    const contactToUpdate = await Contact.findOne({ _id: contactId });
    if (contactToUpdate.owner !== userId) {
      throw Error("Not found in your contacts!");
    }
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    return updatedContact;
  } catch (err) {
    throw Error(err);
  }
};

const updateStatusContact = async (contactId, body, userId) => {
  const { favorite } = body;
  try {
    const contactToUpdate = await Contact.findOne({ _id: contactId });
    if (contactToUpdate.owner !== userId) {
      throw Error("Not found in your contacts!");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    );
    return updatedContact;
  } catch (err) {
    throw Error(err);
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
