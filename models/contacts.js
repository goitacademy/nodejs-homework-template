const fs = require("fs/promises");

const listContacts = async () => {
  try {
    const data = await fs.readFile("./models/contacts.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  const list = await listContacts();
  const [contact] = list.filter((item) => item.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  try {
    const list = await listContacts();
    const filterList = list.filter((item) => item.id !== contactId);
    await fs.writeFile(
      "./models/contacts.json",
      JSON.stringify(filterList),
      "utf8"
    );
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const list = await listContacts();
    list.push(body);
    await fs.writeFile("./models/contacts.json", JSON.stringify(list), "utf8");
  } catch (error) {
    console.log(error);
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
