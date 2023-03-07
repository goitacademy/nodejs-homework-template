const { Contacts } = require("../db");

const listContacts = async (user, skip, limit, favorite) => {
  return await Contacts.find(favorite ? { owner: user, favorite } : { owner: user }).skip(skip).limit(limit);
};

const getContactById = async (contactId, user) => {
  return await Contacts.find({ _id: contactId, owner: user });
};

const findDuplicateContact = async (name, email, phone, user) => {
  return await Contacts.findOne({name, email, phone, owner: user});
}

const addContact = async (body) => {
  return await Contacts.create(body);
};

const updateContact = async (contactId, user, body) => {
  return await Contacts.findOneAndUpdate(
    { _id: contactId, owner: user },
    body,
    {
      new: true,
    }
  );
};

const removeContact = async (contactId, user) => {
  return await Contacts.findOneAndDelete({ _id: contactId, owner: user });
};

const updateStatusContact = async (contactId, user, body) => {
  return await Contacts.findOneAndUpdate(
    { _id: contactId, owner: user },
    body,
    {
      new: true,
    }
  );
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
  findDuplicateContact,
};
