const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const result = await JSON.parse(contacts);
  return result;
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const [findContact] = allContacts.filter((item) => item.id === contactId);
    return findContact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const removedList = allContacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(removedList));
    console.table(removedList);
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  const contact = { ...body, id: shortid() };
  const contactList = await listContacts();

  contactList.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return contact;
};

const updateContact = async (contactId, body) => {
  const contactList = await listContacts();
  const updatedContact = contactList.find((el) => {
    if (el.id === contactId) {
      contactList.push({
        id: contactId,
        name: body.name,
        phone: body.phone,
        email: body.email,
      });
    }
    return updatedContact;
  });

  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
