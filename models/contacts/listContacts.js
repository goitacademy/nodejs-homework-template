const getContacts = require('./getContacts');

async function listContacts() {
  return await getContacts();
}

module.exports = listContacts;
