const shortid = require("shortid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const response = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(response);
    return contacts;
  } catch (error) {
    console.log("error", error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(
      (el) => String(el.id) === String(contactId)
    );
    return contactById;
  } catch (error) {
    console.log("error", error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.filter((el) => el.id !== contactId.toString());
    if (!contactById) {
      return console.log("Contact Not found");
    }
    const data = JSON.stringify(contactById);

    await fs.writeFile(contactsPath, data, "utf-8");
    return contactById;
  } catch (error) {
    console.log("error", error);
  }
};

const addContact = async (body) => {
  const newContact = {
    id: shortid.generate(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };
  const response = await listContacts();

  if (response.find((el) => el.email === newContact.email)) {
    console.log("Sorry, contact with the same email was added before");
    return;
  }
  const data = JSON.stringify([...response, newContact]);

  await fs.writeFile(contactsPath, data, "utf-8");
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const updatedContacts = contacts.map((contact) => {
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
    }
    return contact;
  });
  const data = JSON.stringify(updatedContacts);
  await fs.writeFile(contactsPath, data, "utf-8");
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
