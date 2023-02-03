const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, `/contacts.json`);

const listContacts = async () => {
  try {
    const list = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(list);
  } catch (error) {
    return `${error.message}`;
  }
};

const getContactById = async (contactId) => {
  try {
    const listOfContacts = await listContacts();
    const contact = listOfContacts.find((elem) => elem.id === `${contactId}`);
    return contact;
  } catch (error) {
    return `${error.message}`;
  }
};

const removeContact = async (contactId) => {
  try {
    const { data: listOfContacts } = await listContacts();

    const contact = listOfContacts.find((elem) => elem.id === `${contactId}`);
    if (contact) {
      const newListOfContacts = listOfContacts.filter(
        (elem) => elem.id !== `${contactId}`
      );
      await fs.writeFile(
        contactsPath,
        JSON.stringify(newListOfContacts, null, 2)
      );
      return { message: "Сontact deleted" };
    }
    return null;
  } catch (error) {
    return `${error.message}`;
  }
};

const addContact = async (body) => {
  try {
    const { data: listOfContacts } = await listContacts();
    const newContact = {
      ...body,
      id: nanoid(),
    };

    listOfContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(listOfContacts, null, 2));
    return newContact;
  } catch (error) {
    return `${error.message}`;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { data: list } = await listContacts();

    const newList = list.map((elem) => {
      if (elem.id === `${contactId}`) {
        elem = { ...elem, ...body };
        return elem;
      }
      return elem;
    });
    await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));

    const contact = newList.find((elem) => elem.id === `${contactId}`);
    return contact;
  } catch (error) {
    return `${error.message}`;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
