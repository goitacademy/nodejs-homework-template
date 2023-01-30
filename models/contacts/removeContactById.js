const fs = require("fs").promises;
const filePath = require("./filePath");
const getContactsList = require("./getContactsList");

const removeContactById = async (contactId) => {
  const contactList = await getContactsList();
  const index = contactList.findIndex(({ id }) => id === contactId);
  const removeContact = contactList[index];

  if (index === -1) {
    return null;
  }

  contactList.splice(index, 1);
  await fs.writeFile(filePath, JSON.stringify(contactList));

  return removeContact;
};

module.exports = removeContactById;

