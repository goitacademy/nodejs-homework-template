const contactSchemaDB = require("../models/contact");

const getAllContactsService = async () => {
  const contacts = await contactSchemaDB.find();
  return contacts;
};

const getContactByIdService = async (contactId) => {
  const contacts = await contactSchemaDB.findById(contactId);
  return contacts;
};

const addContactService = async (body) => {
  const newContact = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    favorite: body.favorite,
  };

  await contactSchemaDB.create(newContact);

  return newContact;
};

const removeContactService = async (contactId) => {
  const contacts = await contactSchemaDB.findByIdAndDelete(contactId);

  if (contacts === null) {
    return false;
  }
  return true;
};

const updateContactService = async (contactId, body) => {
  const newContact = {
    name: body.name,
    email: body.email,
    phone: body.phone,
  };

  const contacts = await contactSchemaDB.findByIdAndUpdate(
    contactId,
    newContact,
    { new: true }
  );

  return contacts;
};

const updateContactFavoriteService = async (contactId, body) => {
  const newContact = {
    favorite: body.favorite,
  };

  const contacts = await contactSchemaDB.findByIdAndUpdate(
    contactId,
    newContact,
    { new: true }
  );

  return contacts;
};

module.exports = {
  getAllContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
  updateContactFavoriteService,
};
