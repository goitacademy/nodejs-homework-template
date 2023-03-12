const addNewContact = require('./contacts/addNewContact');
const deleteById = require('./contacts/deleteById');
const getAll = require('./contacts/getAll');
const getById = require('./contacts/getById');
const updateContactInList = require('./contacts/updateContactInList');

module.exports = { getAll, getById, deleteById, addNewContact, updateContactInList }