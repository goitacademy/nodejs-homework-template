const { readContent } = require("./readContent");

const getById = async (contactId) => {
  const contacts = await readContent();
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
};
module.exports = getById;
