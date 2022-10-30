const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

async function getDb() {
  try {
    const contacts = await fs.readFile(contactsPath, { encoding: "utf8" });
    const contactsList = JSON.parse(contacts);
    return contactsList;
  } catch (error) {
    console.error(error.message);
  }
}

const listContacts = async () => {
  try {
    const contactsList = await getDb();
    return contactsList;
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await getDb();
    const contact = contactsList.find((item) => String(item.id) === contactId);

    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await getDb();
    const contacts = contactsList.filter(
      (item) => String(item.id) !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contact = {
      id: nanoid(3),
      name: body.name,
      email: body.email,
      phone: body.phone,
    };
    const contactsList = await getDb();
    contactsList.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList));
    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (id, body, index) => {
  try {
    const contactsList = await getDb();
    const contact = { id, ...contactsList[index], ...body };
    contactsList[index] = contact;

    await fs.writeFile(contactsPath, JSON.stringify(contactsList));
    return contact;
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
