const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");
const textFormat = "utf8";

const getContacts = async () => {
  try {
    const res = await fs.readFile(contactsPath, textFormat);
    return JSON.parse(res);
  } catch (err) {
    return err;
  }
};

const listContacts = async () => {
  return await getContacts();
};

const getContactById = async (contactId) => {
  try {
    const data = await getContacts();
    return data.find((item) => item.id === contactId.toString());
  } catch (err) {
    return err;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await getContacts();
    const contact = data.find((item) => item.id === contactId.toString());

    if (contact) {
      const newData = data.filter((item) => item.id !== contactId.toString());

      await fs.writeFile(contactsPath, JSON.stringify(newData), textFormat);
    }
    return contact;
  } catch (err) {
    return err;
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;

    const data = await getContacts();

    if (data.find((item) => item.name === name)) {
      return;
    }

    const id = (+data[data.length - 1].id + 1).toString();
    const newContact = { id, name, email, phone };

    data.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(data), textFormat);
    return newContact;
  } catch (err) {
    return err;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const newContact = { id: contactId, ...body };
    const data = await getContacts();

    const contactIdx = data.findIndex((item) => item.id === contactId);

    if (contactIdx < 0) {
      return;
    } else {
      const newData = data.map((elem) => {
        if (elem.id === contactId) {
          return newContact;
        }
        return elem;
      });

      await fs.writeFile(contactsPath, JSON.stringify(newData), textFormat);
      return newContact;
    }
  } catch (err) {
    return err;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
