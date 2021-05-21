const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");
// const contacts = require("./contacts.json");
console.log(fs);

const readData = async () => {
  const data = await fs.readFile(
    path.join(__dirname, "contacts.json"),
    "utf-8"
  );
  return JSON.parse(data);
};

const listContacts = async () => {
  return await readData();
}; // getAll

const getContactById = async (contactId) => {
  const data = await readData();
  const [result] = data.filter((contact) => contact.id === contactId);
  return result;
}; // getByID

const removeContact = async (contactId) => {
  const data = await readData();
  const newData = data.filter((contact) => contact.id !== contactId);
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(newData)
  );
  return newData;
};

const addContact = async (body) => {
  const id = uuid();
  const record = {
    id,
    ...body,
    ...body.isVaccinated,
  };
  const data = await readData();
  data.push(record);
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(data)
  );
  return record;
}; // create new

const updateContact = async (contactId, body) => {
  const data = await readData();
  const [result] = data.filter((contact) => contact.id === contactId);
  if (result) {
    Object.assign(result, body);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(data)
    );
  }

  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
