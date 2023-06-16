const fs = require("fs/promises");

const getListOfContacts = async (path) => {
  const contacts = await fs.readFile(path, "UTF-8");
  const arrOfContacts = JSON.parse(contacts);

  return arrOfContacts;
};
module.exports = getListOfContacts;
