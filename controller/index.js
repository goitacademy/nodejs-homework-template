const getContacts = require('./getContacts');
const getById = require('./getById');
const create = require('./create');
const update = require('./update');
const deleteContact = require('./deleteContact');
const updateStatus = require('./updateStatus');

module.exports = {
  getContacts,
  getById,
  deleteContact,
  create,
  update,
  updateStatus,
};
