const fs = require("fs").promises;
const filePath = require("./filePath");
const getContactsList = require("./getContactsList");

const removeContactById = async (contactId) => {
  const contactList = await getContactsList();
  const index = contactList.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const removeContact = contactList[index];
  const newContactList = contactList.filter((_, id) => id !== removeContact.id);
  await fs.writeFile(filePath, JSON.stringify(newContactList));
  return removeContact;
};

module.exports = removeContactById;
