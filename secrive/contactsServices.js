const contactSchemaDB = require("../models/contact");

const getAllContactsService = async ({
  page = 0,
  limit = 0,
  favorite = false,
}) => {
  if (favorite) {
    const contacts = await contactSchemaDB.find({ favorite: true });
    return contacts;
  }
  const contacts = await contactSchemaDB
    .find()
    .limit(limit * 1)
    .skip((page - 1) * limit);
  return contacts;
};

const getContactByIdService = async (contactId) => {
  const contacts = await contactSchemaDB.findById(contactId);
  return contacts;
};

const addContactService = async (userId, body) => {
  const newContact = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    favorite: body.favorite,
    owner: userId,
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
