const fs = require("fs/promises");
const contactPath = require("./contactPath");

const updateContacts = async (newContact) => {
  const contactStr = JSON.stringify(newContact);
  await fs.writeFile(contactPath, contactStr);
};

module.exports = updateContacts;
