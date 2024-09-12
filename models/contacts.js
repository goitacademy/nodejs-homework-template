const fs = require("fs/promises");

const listContacts = async () => {
  try {
    const data = await fs.readFile("./models/contacts.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.lod(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile("./models/contacts.json", "utf8");
    const contacts = JSON.parse(data);

    const [contact] = contacts.filter((contact) => contact.id === contactId);

    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile("./models/contacts.json", "utf8");
    const contacts = JSON.parse(data);

    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(
      "./models/contacts.json",
      JSON.stringify(filteredContacts, null, 2)
    );
    console.table(filteredContacts);
    console.log("\x1b[32m Successfully deleted");
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (body) => {
  try {
    const list = await listContacts();
    list.push(body);
    await fs.writeFile("./models/contacts.json", JSON.stringify(list), "utf8");
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    const list = await listContacts();
    list.forEach((item) => {
      if (item.id === contactId) {
        if (name) {
          item.name = name;
        }
        if (email) {
          item.email = email;
        }
        if (phone) {
          item.phone = phone;
        }
      }
    });
    await fs.writeFile("./models/contacts.json", JSON.stringify(list), "utf8");
    return list;
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
