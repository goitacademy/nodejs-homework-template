const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve(__dirname, "./contacts.json");
const Generator = require("id-generator");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const res = await JSON.parse(data);

    return res;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(data);

    const contact = result.find((evt) => evt.id === contactId);

    return contact !== undefined ? contact : "Not found";
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(data);
    const contact = result.filter((evt) => evt.id !== contactId);
    const findContact = result.find((evt) => evt.id === contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contact), "utf8");

    return findContact !== undefined ? findContact : "Not found";
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  const g = new Generator();
  const data = await fs.readFile(contactsPath, "utf8");
  const result = JSON.parse(data);
  try {
    if (!body.name || !body.email || !body.phone) {
      return "missing required name field";
    } else {
      const newContact = {
        id: g.newId(),
        name: body.name,
        email: body.email,
        phone: body.phone,
      };
      result.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(result), "utf8");
      return newContact;
    }
  } catch (error) {
    console.error(error);
  }
};
const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const result = JSON.parse(data);
  const contact = result.filter((evt) => evt.id !== contactId);
  const findContact = result.find((evt) => evt.id === contactId);
  await fs.writeFile(contactsPath, JSON.stringify(contact), "utf8");

  try {
    if (body.name || body.email || body.phone) {
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
