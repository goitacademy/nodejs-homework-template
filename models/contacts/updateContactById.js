const fs = require("fs").promises;
const filePath = require("./filePath");
const getContactsList = require("./getContactsList");

const updateContactById = async (id, body) => {
  const contactList = await getContactsList();
  const index = contactList.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const updatedContact = contactList[index];
  const updatedContactList = { ...contactList, ...{ id, ...body } };
  await fs.writeFile(filePath, JSON.stringify(updatedContactList));
  return updatedContact;
};

module.exports = updateContactById;
