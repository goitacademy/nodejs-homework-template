const { Contact } = require('../../models/contact');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data) || null;
};

module.exports = listContacts;