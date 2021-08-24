const fs = require("fs/promises");
const filePath = require("./filePath");

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  return JSON.parse(data);
};

module.exports = listContacts;
