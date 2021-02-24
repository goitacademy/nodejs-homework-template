const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "/contacts.json");

const getAll = async () => {
  const data = await fs.readFile(contactsPath);
  const parsedData = JSON.parse(data.toString());
  return parsedData;
};

const getById = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const parsedData = JSON.parse(data.toString());
  const contact = parsedData.find(
    (element) => element.id.toString() === contactId
  );
  return contact;
};

const remove = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const parsedData = JSON.parse(data.toString());
  const deletedContact = parsedData.find((item) => item.id === contactId);
  const updatedData = parsedData.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updatedData));
  return deletedContact;
};

const add = async (body) => {
  const data = await fs.readFile(contactsPath);
  const parsedData = JSON.parse(data.toString());
  const record = {
    id: uuidv4(),
    ...body,
  };
  parsedData.push(record);
  await fs.writeFile(contactsPath, JSON.stringify(parsedData));
  return record;
};

const update = async (contactId, body) => {
  const data = await fs.readFile(contactsPath);
  const parsedData = JSON.parse(data.toString());

  const updatedData = parsedData.map((contact) =>
    contact.id.toString() === contactId ? { ...contact, ...body } : contact
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedData));
  return updatedData.find((contact) => contact.id.toString() === contactId);
};

module.exports = {
  getAll,
  getById,
  remove,
  add,
  update,
};
