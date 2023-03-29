const fs = require("fs").promises;

const writeContacts = async (data) => {
  await fs.writeFile('./models/contacts.json', JSON.stringify(data));
};

module.exports = writeContacts;
