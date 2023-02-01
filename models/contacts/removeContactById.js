const fs = require("fs").promises;
const filePath = require("./filePath");
const getContactsList = require("./getContactsList");

const removeContactById = async (contactId) => {
  const contactList = await getContactsList();
  let removeContact;
  const newContactList = contactList.filter((contact) => {
    if (contact.id === contactId) {
      removeContact = contact;
    }
    return contact.id !== contactId;
  });
  await fs.writeFile(filePath, JSON.stringify(newContactList));
  return removeContact;
};

module.exports = removeContactById;
