const readContact = require("./readContact");

const listContacts = async () => {
  return await readContact();
};
module.exports = listContacts;
