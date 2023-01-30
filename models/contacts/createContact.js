const fs = require("fs").promises;
const filePath = require("./filePath");
const { v4: uuidv4 } = require("uuid");
const getContactsList = require("./getContactsList");

const createContact = async (body) => {
  const contactList = await getContactsList();
  const newContact = { id: uuidv4(), ...body };
  contactList.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contactList));
  return newContact;
};

module.exports = createContact;
