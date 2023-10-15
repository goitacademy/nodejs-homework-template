const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

const addContact = async (name, email, phone) => {
    try {
        const { nanoid } = await import('nanoid');

        const contacts = await listContacts();
        const newContact = {
          id: nanoid(),
          name,
          email,
          phone,
        };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

        return newContact;
      } catch (error) {
        throw error;
      }
};

const removeContact = async (id) => {
    const contacts = await listContacts()
    const index = contacts.findIndex((item) => item.id === id)
    if (index === -1) {
        return null
    }
 
    const [result] = contacts.splice(index, 1)
    await updateContacts(contacts)
    return result
};

const updateById = async (id, name, email, phone) => {
  const contacts = await listContacts()
  const index = contacts.findIndex((item) => item.id === id)
  if (index === -1) {
      return null
  }
  contacts[index] = {
      id, 
      name: name ? name : contacts[index].name, 
      email: email ? email : contacts[index].email,
      phone: phone ? phone : contacts[index].phone
  }
  await updateContacts(contacts)
  return contacts[index]
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateById,
};