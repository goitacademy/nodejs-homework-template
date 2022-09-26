const fs = require("fs/promises");
const contactPath = require("./contactPath");

async function updateContacts(allContacts) {
  await fs.writeFile(contactPath, JSON.stringify(allContacts, null, 2));
}

module.exports = updateContacts;
