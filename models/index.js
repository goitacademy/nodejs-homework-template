const { find } = require("./schemas/contacts");
const Contact = require("./schemas/contacts");
const User = require("./schemas/users");

const listContacts = async () => {
  const contacts = Contact.find();
  return contacts;
};
const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const deletedContact = Contact.findByIdAndDelete(contactId);
  return deletedContact;
};

const addContact = async (contact) => {
  const newContact = Contact.create(contact);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const updatedContact = Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return updatedContact;
};

// Auth

const addUser = async (user) => {
  const newUser = User.create(user);
  return newUser;
};

const getUserByEmail = async (email) => {
  const user = User.findOne({ email });
  return user;
};
const updateUser = async (id, body) => {
  return await User.findByIdAndUpdate(id, body, {
    new: true,
  });
};
const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};
// ---------
const getUsers = async () => {
  const users = await User.find();
  console.log(users);
};
getUsers();

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  addUser,
  getUserByEmail,
  updateUser,
  getUserById,
};
