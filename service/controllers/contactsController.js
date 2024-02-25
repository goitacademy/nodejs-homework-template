const { Contact } = require("../Schemas/contactSchema");

const listContacts = async (owner) => {
  try {
    const contacts = await Contact.find({ owner });
    return contacts;
  } catch (err) {
    throw Error(err);
  }
};

const getContactById = async (contactId, owner) => {
  try {
    const contactToFind = await Contact.findOne({
      _id: contactId,
      owner,
    });

    if (!contactToFind) {
      throw Error("Not found in your contacts!");
    }
    return contactToFind;
  } catch (err) {
    throw Error(err);
  }
};

const removeContact = async (contactId, owner) => {
  try {
    const contactToDelete = await Contact.findByIdAndDelete({
      _id: contactId,
      owner,
    });
    if (!contactToDelete) {
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

const updateContact = async (contactId, body, owner) => {
  try {
    const contactToUpdate = await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      body,
      {
        new: true,
      }
    );

    if (!contactToUpdate) {
      throw Error("Not found in your contacts!");
    }
    return contactToUpdate;
  } catch (err) {
    throw Error(err);
  }
};

const updateStatusContact = async (contactId, body, owner) => {
  const { favorite } = body;
  try {
    const contactToUpdate = await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      { favorite },
      {
        new: true,
      }
    );
    if (!contactToUpdate) {
      throw Error("Not found in your contacts!");
    }

    return contactToUpdate;
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
