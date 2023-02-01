const fs = require("fs").promises;
const filePath = require("./filePath");
const getContactsList = require("./getContactsList");

const updateContactById = async (id, body) => {
  const contactList = await getContactsList();
  let updatedContact;
  const updatedContactList = contactList.map((contact) => {
    if (contact.id === id) {
      updatedContact = { ...contact, ...body };
      return updatedContact;
    }
    return contact;
  });
  await fs.writeFile(filePath, JSON.stringify(updatedContactList));
  return updatedContact;
};

module.exports = updateContactById;
