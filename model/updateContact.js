const fs = require("fs/promises");

const filePath = require("./contactsPath");

const updateContact = async (body) => {
  await fs.writeFile(filePath, JSON.stringify(body));
};

module.exports = updateContact;
