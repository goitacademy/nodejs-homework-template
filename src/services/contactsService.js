const { Contact } = require('../db/contactModel');
require('colors');

const listContacts = async (owner, {skip, limit}) => {
  try {
    const contacts = await Contact.find({ owner })
      .select({ __v: 0 })
      .skip(skip)
      .limit(limit);

    console.log(`Total contacts: ${contacts.length}`.green);
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId, owner) => {
  try {
    const contactById = await Contact.findOne({
      _id: contactId, owner})
      .select({ __v: 0 });
    console.log(`Contact with id '${contactId}'`.cyan, contactById);
    
    return contactById;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (name, email, phone, favorite, owner) => {
  try {
    const newContact = new Contact({ name, email, phone, favorite, owner });
    await newContact.save();

    console.log(`Contact ${name} successfully added.`.yellow);
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const deleteContact = async (contactId, owner) => {
  try {
    const deletedContact = await Contact.findOneAndRemove({
      _id: contactId, owner})
    .select({ __v: 0 });

    console.log(`Contact with id '${contactId}' successfully deleted.`.blue);
    return deletedContact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, name, email, phone, favorite, owner) => {
  try {
    await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      { $set: { name, email, phone, favorite } });

    const updatedContact = await Contact.findById(contactId);

    console.log(`Contact with id '${contactId}' successfully updated.`.bgWhite);
    return updatedContact;
  } catch (error) {
    console.error(error);
  }
};

const updateStatusContact = async (contactId, favorite, owner) => {
  try {
    await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      { $set: { favorite } });

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
