const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, `/contacts.json`);

const listContacts = async () => {
    const list = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(list);
};

const getContactById = async (contactId) => {
    const listOfContacts = await listContacts();
    const contact = listOfContacts.find((elem) => elem.id === `${contactId}`);
    return contact;
};

const removeContact = async (contactId) => {
    const listOfContacts = await listContacts();

    const contact = listOfContacts.find((elem) => elem.id === `${contactId}`);
    if (contact) {
      const newListOfContacts = listOfContacts.filter(
        (elem) => elem.id !== `${contactId}`
      );
      await fs.writeFile(
        contactsPath,
        JSON.stringify(newListOfContacts, null, 2)
      );
      return ({ message: "Сontact deleted" });
    }
    return null;
};

const addContact = async (body) => {
    const listOfContacts = await listContacts();
    const newContact = {
      ...body,
      id: nanoid(),
    };

    listOfContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(listOfContacts, null, 2));
    return newContact;
};

const updateContact = async (contactId, body) => {
    const list = await listContacts();
  const contact = list.find((elem) => elem.id === `${contactId}`);
  if (!contact) {
    return null
  }
    const newList = list.map((elem) => {
      if (elem.id === `${contactId}`) {
        elem = { ...elem, ...body };
        return elem;
      }
      return elem;
    });
    await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));

    const newContact = newList.find((elem) => elem.id === `${contactId}`);
    return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
