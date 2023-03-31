const { User } = require("../models/user");
const contacts = require("../models/contacts.json");
const userStorage = contacts;

const listContacts = () => {
  return userStorage;
};

const getContactById = (id) => {
  return userStorage.find((u) => u.id == id);
};

const removeContact = (id) => {
  for (var i = 0; i < userStorage.length; i++) {
    if (userStorage[i].id == id) {
      userStorage.splice(i, 1);
      return;
    }
  }
};

const addContact = (id, name, phone, email) => {
  const user = new User(id, name, phone, email);
  userStorage.push(user);
  return user;
};

const updateContact = (id, newUser) => {
  for (var i = 0; i < userStorage.length; i++) {
    if (userStorage[i].id == id) {
      userStorage[i] = newUser;

      return;
    }
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
