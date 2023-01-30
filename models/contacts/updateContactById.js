const fs = require("fs").promises;
const filePath = require("./filePath");
const getContactsList = require("./getContactsList");

const updateContactById = async (id, body) => {
  const contactList = await getContactsList();
  const index = contactList.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const updatedContactList = contactList.map((contact) => {
    if (contact.id === id) {
      return { ...contact, ...body };
    }
    return contact;
  });
  await fs.writeFile(filePath, JSON.stringify(updatedContactList));
  const updatedContact = updatedContactList[index];
  return updatedContact;
};

module.exports = updateContactById;
