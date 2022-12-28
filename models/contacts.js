const fs = require("fs/promises");
const path = require("node:path");
// const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./models/contacts.json");

async function readDb() {
  const dbRaw = await fs.readFile(contactsPath, { encoding: "utf8" });
  const db = JSON.parse(dbRaw);
  return db;
}
async function writeDB(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

const listContacts = async () => {
  try {
    const data = await readDb();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await readDb();

    return data.find((item) => Number(item.id) === Number(contactId));
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await readDb();

    const updateContact = data.filter(
      (item) => Number(item.id) !== Number(contactId)
    );
    await writeDB(updateContact);
    console.log(`Kонтакт deleted, id = ${contactId}`);
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  try {
    const data = await readDb();

    const lastContactId = data.slice(-1).find((el) => el).id;
    // const id = nanoid();
    const newContact = {
      id: JSON.stringify(Number(lastContactId) + 1),
      // id: id,
      name: body.name,
      email: body.email,
      phone: body.phone,
    };
    const updateContact = [...data, newContact];
    await writeDB(updateContact);
    console.log(`Kонтакт записан, id = ${newContact.id}`);
    return readDb();
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await readDb();
    const result = data.find((item) => item.id === contactId);
    if (result) {
      Object.assign(result, body);

      await writeDB(data);
    }
    return result;
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
