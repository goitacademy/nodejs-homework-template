const Contact = require("../schemas/contacts.schema");

const listContacts = async (ownerId) => {
  try {
    const contacts = await Contact.find({ owner: ownerId }).populate(
      "owner",
      "email"
    );
    return contacts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw new Error("Contact not found");
    }
    return contact;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const removedContact = await Contact.findByIdAndRemove(contactId);
    if (!removedContact) {
      throw new Error("Contact not found");
    }
    return removedContact;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addContact = async (body, ownerId) => {
  try {
    const newContact = await Contact.create({ ...body, owner: ownerId });
    console.log("Contact added!");
    return newContact;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (!updatedContact) {
      throw new Error("Contact not found");
    }
    return updatedContact;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateStatusContact = async (contactId, favorite) => {
  try {
    if (favorite === undefined) {
      throw new Error("Missing field 'favorite'");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!updatedContact) {
      throw new Error("Contact not found");
    }

    return updatedContact;
  } catch (error) {
    console.log(error);
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
