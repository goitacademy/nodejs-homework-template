const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const contactById = contactsList.find((item) => item.id === contactId);
  return contactById;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const indx = await contactsList.findIndex(
    (item) => item.id === contactId.toString()
  );
  if (indx === -1) {
    return null;
  }
  const removeItem = contactsList.splice(indx, 1);
  const newContacts = await contactsList.filter(
    (item) => item.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));

  return removeItem;
};

const addContact = async (body) => {
  const id = nanoid();
  const newContact = {
    id,
    ...body,
  };
  const contactsList = await listContacts();
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return newContact;
};

const changeContact = async (contactId, body) => {
  const { name, phone, email } = body;
  const data = await listContacts();
  data.forEach((element) => {
    if (element.id === contactId) {
      element.name = name;
      element.phone = phone;
      element.email = email;
    }
  });

  await fs.writeFile(contactsPath, JSON.stringify(data));
  return await getContactById(contactId);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  changeContact,
};
