const { Contacts } = require('../dataBase/contactsModel');
const { WrongParametersError } = require('../helpers/errors');

const listContacts = async userId => {
  const contacts = await Contacts.find({ owner: userId });

  if (!contacts) {
    throw new WrongParametersError('No contact found');
  }

  return contacts || false;
};

const getContactById = async (userId, contactId) => {
  const foundContact = await Contacts.findOne({
    _id: contactId,
    owner: userId,
  });

  if (!foundContact) {
    throw new WrongParametersError(`No contact by id:${contactId} found`);
  }

  return foundContact || false;
};

const removeContact = async (contactId, userId) => {
  await Contacts.findOneAndRemove({ _id: contactId, owner: userId });
};

const addContact = async (body, userId) => {
  const newContact = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    favourite: body.favourite ? body.favourite : false,
    owner: userId,
  };
  const contactToAdd = new Contacts(newContact);

  await contactToAdd.save();

  if (!contactToAdd) {
    throw new WrongParametersError('Cannot save new contact');
  }

  return contactToAdd;
};

const updateContact = async (contactId, body, userId) => {
  const newContactData = {
    name: body.name ? body.name : undefined,
    email: body.email ? body.email : undefined,
    phone: body.phone ? body.phone : undefined,
  };

  const updatedContact = await Contacts.findOneAndUpdate(
    { _id: contactId, owner: userId },
    {
      $set: newContactData,
    },
    { new: true, omitUndefined: true },
  );

  if (!updatedContact) {
    throw new WrongParametersError(`Cannot update contact by id:${contactId}`);
  }

  return updatedContact || false;
};

const updateStatusContact = async (contactId, body, userId) => {
  const newContactData = {
    favourite: body.favourite,
  };

  const updatedContact = await Contacts.findOneAndUpdate(
    { _id: contactId, owner: userId },
    {
      $set: newContactData,
    },
    { new: true },
  );

  if (!updatedContact) {
    throw new WrongParametersError(
      `Cannot update status of contact by id:${contactId}`,
    );
  }

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
