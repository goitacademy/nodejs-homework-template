const fs = require("fs/promises");
const filePatch = require("./filePath");

async function updateContactsList(newContacts) {
  const newContactsList = JSON.stringify(newContacts);
  await fs.writeFile(filePatch, newContactsList);
}

module.exports = updateContactsList;
