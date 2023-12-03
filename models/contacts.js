const fs = require('fs/promises');
const path = require ('path')
const nanoid = require ('nanoid');

const contactsPath = path.resolve('models', 'contacts.json');

 const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contactsList = JSON.parse(data);

    return contactsList;
  } catch (error) {
    console.error(error.message);
  }
};

 const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === id);
    return contact || null;
  } catch (error) {
    console.error(error.message);
  }
};

 const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);

  await updateContact(contacts);
  return result;
};

const addContact = async ({ name, email, phone }) => {

    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);

    await updateContact(contacts);

};

const updateContact = async (contacts) => {

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
