const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    const jsonData = JSON.parse(contactsList);
    return jsonData;
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const jsonArray = await fs.readFile(contactsPath, "utf8");
    const contactsList = JSON.parse(jsonArray);
    const contact = contactsList.find((el) => el.id === contactId);
    return contact;
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const jsonArray = await fs.readFile(contactsPath, "utf8");
    const contactsList = JSON.parse(jsonArray);

    const editedContactsList = contactsList.filter((el) => el.id !== contactId);

    const JsonEditedContactsList = JSON.stringify(editedContactsList, null, 2);
    await fs.writeFile(contactsPath, JsonEditedContactsList);

    return { message: "contact deleted" };
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const jsonArray = await fs.readFile(contactsPath, "utf8");
    const contactsList = JSON.parse(jsonArray);
    let lastId;
    if (contactsList.length > 0) {
      lastId = contactsList[contactsList.length - 1].id;
    } else {
      lastId = 0;
    }
    const newContact = {
      id: (Number(lastId) + 1).toString(),
      name,
      email,
      phone,
    };
    const newList = [...contactsList, newContact];
    const JsonEditedContactsList = JSON.stringify(newList, null, 2);
    await fs.writeFile(contactsPath, JsonEditedContactsList);
    return newContact;
  } catch (error) {
    console.error(error);
  }
}

async function updateContact(id, body) {
  try {
    const jsonArray = await fs.readFile(contactsPath, "utf8");
    const contactsList = JSON.parse(jsonArray);
    const contact = contactsList.find((el) => el.id === id);

    if (!contact) return { message: "Not found" };

    const { name, email, phone } = body;

    const updatedList = contactsList.map((contact) => {
      if (contact.id === id) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
      }

      return contact;
    });

    await fs.writeFile(contactsPath, JSON.stringify(updatedList, null, 2));

    return { name, email, phone };
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  addContact,
  removeContact,
  getContactById,
  listContacts,
  updateContact,
};
