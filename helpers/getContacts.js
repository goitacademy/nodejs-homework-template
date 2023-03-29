const fs = require("fs").promises;

const getContacts = async () => {
  const data = await fs.readFile('./models/contacts.json');
  const contacts = JSON.parse(data);
  return contacts;
};

module.exports = getContacts;
