const fs = require("fs/promises");

const filePath = require("./filePath");

async function listContacts() {
  const contacts = await fs.readFile(filePath, "utf-8");
  return JSON.parse(contacts);
}

module.exports = listContacts;
