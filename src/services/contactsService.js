const { Contact } = require('../db/contactModel');
require('colors');

const listContacts = async (userId) => {
  try {
    const contacts = await Contact.find({userId});

    console.log(`Total contacts: ${contacts.length}`.green);
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId, userId) => {
  try {
    const contactById = await Contact.findOne({
      _id: contactId, userId });
    console.log("contactById", contactById);
    
    return contactById;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (name, email, phone, favorite, userId) => {
  try {
    const newContact = new Contact({ name, email, phone, favorite, userId });
    await newContact.save();

    console.log(`Contact ${name} successfully added.`.yellow);
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const deleteContact = async (contactId, userId) => {
  try {
    const deletedContact = await Contact.findOneAndRemove({
      _id: contactId, userId });

    console.log(`Contact with id '${contactId}' successfully deleted.`.blue);
    return deletedContact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, name, email, phone, favorite, userId) => {
  try {
    await Contact.findOneAndUpdate(
      { _id: contactId, userId },
      { $set: { name, email, phone, favorite } },
    );

    const updatedContact = await Contact.findById(contactId);

    console.log(`Contact with id '${contactId}' successfully updated.`.bgWhite);
    return updatedContact;
  } catch (error) {
    console.error(error);
  }
};

const updateStatusContact = async (contactId, favorite, userId) => {
  try {
    await Contact.findOneAndUpdate(
      { _id: contactId, userId },
      { $set: { favorite } },
    );

    const updatedContact = await Contact.findById(contactId);

    console.log(`Contact's status with id '${contactId}' successfully updated.`.bgWhite);
    return updatedContact;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
  updateStatusContact,
};
