const mongoose = require('mongoose');
const { Contact } = require('../db/contactModel');
const { NotFoundError } = require('../helpers/errors');
require('colors');

const listContacts = async () => {
  try {
    const contacts = await Contact.find({});

    console.log(`Total contacts: ${contacts.length}`.green);
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactById = await Contact.findById(mongoose.Types.ObjectId(contactId));
    console.log(contactById);

    if (!contactById) {
      throw new NotFoundError(`Contact with id '${contactId}' not found`);
    }
    
    return contactById;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (name, email, phone, favorite) => {
  try {
    const newContact = new Contact({ name, email, phone, favorite: false });
    await newContact.save();

    console.log(`Contact ${name} successfully added.`.yellow);
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const deleteContact = async (contactId) => {
  try {
    const deletedContact = await Contact.findByIdAndRemove(contactId);
    console.log(deletedContact);

    if (!deletedContact) {
      throw new NotFoundError(`Contact with id '${contactId}' not found`);
    };

    console.log(`Contact with id '${contactId}' successfully deleted.`.blue);
    return;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, name, email, phone, favorite) => {
  try {
    await Contact.findByIdAndUpdate(contactId,
      { $set: { name, email, phone, favorite } }
    );

    const updatedContact = await Contact.findById(contactId);

    if (!updatedContact) {
      throw new NotFoundError(`Contact with id '${contactId}' not found`);
    };

    console.log(`Contact with id '${contactId}' successfully updated.`.bgWhite);
    return updatedContact;
  } catch (error) {
    console.error(error);
  }
};

const updateStatusContact = async (contactId, favorite) => {
  try {
    await Contact.findByIdAndUpdate(contactId,
      { $set: { favorite } }
    );

    const updatedContact = await Contact.findById(contactId);

    if (!updatedContact) {
      throw new NotFoundError(`Contact with id '${contactId}' not found`);
    };

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
