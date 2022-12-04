const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("contacts.json");
console.log("contactsPath", contactsPath);

const listContacts = async () => {
  try {
    const data = await fs.readFile(path.resolve("./db/contacts.json"), "utf8");
    const targetData = JSON.parse(data);
    console.table(targetData);
  } catch (err) {
    console.error(err);
  }
};
const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(path.resolve("./db/contacts.json"), "utf8");

    const targetData = JSON.parse(data);

    // eslint-disable-next-line array-callback-return
    targetData.map((contact) => {
      if (contact.id === contactId.toString()) {
        console.table(contact);
      }
    });
  } catch (err) {
    console.error(err);
  }
};
const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(path.resolve("./db/contacts.json"), "utf8");

    const targetData = JSON.parse(data);
    const index = targetData.findIndex((contact) => {
      return contact.id === contactId.toString();
    });

    targetData.splice(index, 1);

    await fs.writeFile(
      "./db/contacts.json",
      JSON.stringify(targetData),
      "utf8"
    );
    console.table(targetData);
  } catch (err) {
    console.error(err);
  }
};
const addContact = async (name, email, phone) => {
  console.log("addContact");
  try {
    const data = await fs.readFile(path.resolve("./db/contacts.json"), "utf8");
    const targetData = JSON.parse(data);
    phone = phone.toString();
    const newContact = {
      name,
      email,
      phone,
    };
    targetData.push(newContact);

    await fs.writeFile(
      "./db/contacts.json",
      JSON.stringify(targetData),
      "utf8"
    );
    console.table(targetData);
  } catch (err) {
    console.error(err);
  }
};
module.exports = { listContacts, getContactById, removeContact, addContact };
