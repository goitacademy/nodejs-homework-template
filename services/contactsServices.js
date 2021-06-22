const { Contacts } = require('../dataBase/contactsModel');

const listContacts = async () => {
  try {
    const contacts = await Contacts.find({});
    return contacts;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getContactById = async contactId => {
  try {
    const foundContact = await Contacts.findById(contactId);
    return foundContact || false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const removeContact = async contactId => {
  try {
    await Contacts.findByIdAndRemove(contactId);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const addContact = async body => {
  const newContact = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    favourite: body.favourite ? body.favourite : false,
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
    name: body.name ? body.name : undefined,
    email: body.email ? body.email : undefined,
    phone: body.phone ? body.phone : undefined,
  };
  try {
    const updatedContact = await Contacts.findByIdAndUpdate(
      contactId,
      {
        $set: newContactData,
      },
      { new: true, omitUndefined: true },
    );
    return updatedContact;
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
    const updatedContact = await Contacts.findByIdAndUpdate(
      contactId,
      {
        $set: newContactData,
      },
      { new: true },
    );
    return updatedContact;
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
