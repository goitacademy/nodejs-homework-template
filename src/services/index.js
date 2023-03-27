const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  findDuplicateContact,
} = require("./contactsService");

const { createEmail, sendEmail } = require("../email");

const {
  findUserInDb,
  findUserById,
  addNewUser,
  updateUser,
  removeToken,
  findUserToVerify,
} = require("./usersService");

module.exports = {
  listContacts,
  getContactById,
  findDuplicateContact,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  findUserInDb,
  findUserById,
  addNewUser,
  updateUser,
  removeToken,
  findUserToVerify,
  createEmail,
  sendEmail,
};
