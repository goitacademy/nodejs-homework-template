const { Contacts } = require('../dataBase/contactsModel');

const listContacts = async () => {
  try {
    const contacts = await Contacts.find({});
    return contacts;
  } catch (error) {
    return false;
  }
};

const getContactById = async contactId => {
  try {
    const foundContact = Contacts.findById(contactId);
    return foundContact;
  } catch (error) {
    return false;
  }
};

const removeContact = async contactId => {
  try {
    await Contacts.findByIdAndRemove(contactId);
    return true;
  } catch (error) {
    return false;
  }
};

const addContact = async body => {
  const newContact = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    favourite: body.favourite,
  };
  const contactToAdd = new Contacts(newContact);

  try {
    await contactToAdd.save();
    return contactToAdd;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateContact = async (contactId, body) => {
  const newContactData = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    favourite: body.favourite,
  };
  try {
    await Contacts.findByIdAndUpdate(contactId, { $set: newContactData });
    return newContactData;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateFavourite = async (contactId, body) => {
  const newContactData = {
    favourite: body.favourite,
  };
  try {
    await Contacts.findByIdAndUpdate(contactId, { $set: newContactData });
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavourite,
};
