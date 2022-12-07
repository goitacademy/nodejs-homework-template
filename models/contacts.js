import { promises as fs } from "fs";
import { join } from "path";

const contactsPath = join(__dirname, "contacts.json");
console.log("contactsPath", contactsPath);

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const targetData = JSON.parse(data);
    return targetData;
  } catch (err) {
    console.error(err);
  }
};
const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");

    const targetData = JSON.parse(data);
    let targetContact = null;
    targetData.forEach((contact) => {
      if (contact.id === contactId) {
        targetContact = contact;
      }
    });
    return targetContact;
  } catch (err) {
    console.error(err);
  }
};
const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");

    const targetData = JSON.parse(data);
    const index = targetData.findIndex((contact) => {
      return contact.id === contactId;
    });

    targetData.splice(index, 1);

    await fs.writeFile(
      "./models/contacts.json",
      JSON.stringify(targetData),
      "utf8"
    );
  } catch (err) {
    console.error(err);
  }
};
const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const targetData = JSON.parse(data);
    phone = phone.toString();
    const newContact = {
      name,
      email,
      phone,
    };
    targetData.push(newContact);

    await fs.writeFile(
      "./models/contacts.json",
      JSON.stringify(targetData),
      "utf8"
    );
  } catch (err) {
    console.error(err);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const targetData = JSON.parse(data);
    let targetContact = null;
    targetData.forEach((contact) => {
      if (contact.id === contactId) {
        if (body.name) {
          contact.name = body.name;
        }
        if (body.email) {
          contact.email = body.email;
        }
        if (body.phone) {
          contact.phone = body.phone;
        }
        targetContact = contact;
      }
    });
    await fs.writeFile(
      "./models/contacts.json",
      JSON.stringify(targetData),
      "utf8"
    );
    return targetContact;
  } catch (err) {
    console.error(err);
  }
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
