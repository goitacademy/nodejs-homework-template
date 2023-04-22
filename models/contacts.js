const Contact = require("./contactSchema");

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const removedContact = await Contact.findByIdAndRemove(contactId);
    console.log(`Contact with ID ${contactId} removed`);
    return removedContact;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  try {
    const newContact = new Contact(body);
    const result = await newContact.save();
    console.log("New contact added");
    return result;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    console.log(updatedContact);
    console.log(`Contact with ID ${contactId} updated`);
    return updatedContact;
  } catch (error) {
    console.error(error);
  }
};

const updateStatusContact = async (contactId, favorite) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { $set: favorite },
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    console.error(error);
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
