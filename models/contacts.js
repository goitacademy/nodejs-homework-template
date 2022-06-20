const fs = require("fs/promises");
const path = require("path");

const pathContacts = path.resolve(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(pathContacts, "utf-8");
    const parseContacts = JSON.parse(contacts);
    return parseContacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.filter((contact) => contact.id === contactId);
    return contactById;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const checkById = contacts.some((contact) => contact.id === contactId);

    if (!checkById) {
      return {
        message: `Contact with id: "${contactId}" does't exist. Please try again!`,
        status: 404,
      };
    }

    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    const newListContacts = JSON.stringify(filteredContacts);
    await fs.writeFile(pathContacts, newListContacts, "utf-8");

    return { message: "Contact deleted", status: 200 };
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContactsList = JSON.stringify([...contacts, body]);
  return await fs.writeFile(pathContacts, newContactsList, "utf-8");
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contactById = await getContactById(contactId);

    if (contactById.length === 0) {
      return { message: "Not found", status: 400 };
    }
    const newContactsList = contacts.map((contact) => {
      if (contact.id === contactId) {
        contact.name = body.name.trim() ? body.name : contact.name;
        contact.email = body.email.trim() ? body.email : contact.email;
        contact.phone = body.phone.trim() ? body.phone : contact.phone;
        return contact;
      }
      return contact;
    });
    await fs.writeFile(pathContacts, JSON.stringify(newContactsList), "utf-8");
    return { ...contactById[0], ...body };
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
