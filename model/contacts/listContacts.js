const { readContent } = require("./readContent");

const listContacts = async () => {
  const contacts = await readContent();
  return contacts;
};
module.exports = listContacts;
