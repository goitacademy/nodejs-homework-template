const Contacts = require("../../service/schemas/contacts");
const User = require("../../service/schemas/user");

const listContacts = async () => {
  return await Contacts.find();
};

const getContactById = async (contactId, owner) => {
  return await Contacts.findOne({ _id: `${contactId}`, owner }).catch((err) =>
    console.log("err", err)
  );
};

const removeContact = async (contactId, owner) => {
  return await Contacts.findOneAndRemove({ _id: contactId, owner }).catch(
    (err) => console.log("err", err)
  );
};

const addContact = async ({ name, email, phone, owner }) => {
  return await Contacts.create({ name, email, phone, owner }).catch((err) =>
    console.log("err", err)
  );
};

const updateContact = async (contactId, body, owner) => {
  return await Contacts.findOneAndUpdate({ _id: contactId, owner }, body).catch(
    (err) => console.log("err", err)
  );
};

// Users

const getUserById = async (contactId) => {
  return await User.findOne({ _id: contactId }).catch((err) =>
    console.log("err", err)
  );
};

const updateUserToken = async (userId, token) => {
  return await User.findOneAndUpdate({ _id: userId }, { token }).catch((err) =>
    console.log("err", err)
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  getUserById,
  updateUserToken,
};
