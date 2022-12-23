const {Contact} = require('../db/contactModel');

const listContacts = async () => {
  try {
    const contacts = Contact.find({});
    console.log(contacts);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

const getContactById = async (contactId) => {
    try {
      const contact = await Contact.findById(contactId);
      return contact || null;
    } catch (error) {
      console.log(error);
    }
}

const removeContact = async (contactId) => {
    try {
      const deletedContact = await Contact.findByIdAndRemove(contactId);
      return deletedContact;
    } catch (error) {
      console.log(error);
    }
}

const addContact = async (body) => {
  try {
    const newContact = new Contact(body);
    await newContact.save();
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

const updateContact = async (contactId, body) => {
  try {
    await Contact.findByIdAndUpdate(contactId, body);
    return body;

  } catch (error) {
    console.log(error);
  }
}

const updateStatusContact = async (contactId, body) => {
  try {
      const contactStatusUpdated = await Contact.findByIdAndUpdate(contactId, {body}, {
        new: true,
      });
      return contactStatusUpdated;
      
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
