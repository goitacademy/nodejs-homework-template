const addContact = require('./contacts/addContact');
const getAllContacts = require('./contacts/getAllContacts');
const getContact = require('./contacts/getContact');
const removeContact = require('./contacts/removeContact');
const updateContact = require('./contacts/updateContact');
const updateStatusContact = require('./contacts/updateStatusContact');
const currentUser = require('./users/currentUser');
const loginUser = require('./users/loginUser');
const logoutUser = require('./users/logoutUser');
const signupUser = require('./users/signupUser');

module.exports = {addContact,getAllContacts,getContact,removeContact,updateContact,updateStatusContact,
    currentUser, loginUser, logoutUser,signupUser}