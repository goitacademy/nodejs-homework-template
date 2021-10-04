const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "contacts.json");

const updateContact = async (newContact) => {
  await fs.writeFile(filePath, JSON.stringify(newContact));
};

module.exports = updateContact;
