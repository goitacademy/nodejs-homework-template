const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const readFromDatabase = async () => {
  const response = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(response);
};

const writeToDatabase = async (contacts) => {
  const data = JSON.stringify(contacts, null, 2);
  await fs.writeFile(contactsPath, data, "utf-8");
};

const listContacts = async () => {
  return await readFromDatabase();
};

const getContactById = async (contactId) => {
  const contacts = await readFromDatabase();
  return contacts.find(({ id }) => id.toString() === contactId.toString());
};

const addContact = async (body) => {
  const contacts = await readFromDatabase();

  const newContact = { id: Date.now().toString(), ...body };
  await writeToDatabase([...contacts, newContact]);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readFromDatabase();

  // const searchedContact = contacts.find(({ id }) => id === contactId);

  // if (!searchedContact) {
  //   return;
  // }

  // const newContacts = contacts.filter((contact) => {
  //   if (contact.id.toString() === contactId.toString()) {
  //     contact.name = body.name;
  //     contact.email = body.email;
  //     contact.phone = body.phone;
  //   }
  // });

  // await writeToDatabase(newContacts);

  // return true;

  let isContact = false;

  contacts.forEach((contact) => {
    if (contact.id.toString() === contactId.toString()) {
      contact.name = body.name;
      contact.email = body.email;
      contact.phone = body.phone;
      isContact = true;
    }
  });
  await writeToDatabase(contacts);

  return isContact;
};

const removeContact = async (contactId) => {
  const contact = await getContactById(contactId);

  if (!contact) {
    return;
  }

  const contacts = await readFromDatabase();
  const newContacts = contacts.filter(
    ({ id }) => id.toString() !== contactId.toString()
  );
  await writeToDatabase(newContacts);
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
