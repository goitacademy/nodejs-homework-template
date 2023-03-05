const fs = require("fs").promises;
const uuid = require("uuid").v4;
const listContacts = async () => {
  try {
    const dataFromDB = await fs.readFile("./models/contacts.json");
    const contacts = JSON.parse(dataFromDB);
    return { body: contacts, type: "succes" };
  } catch (err) {
    return { type: "error", body: err };
  }
};

const getContactById = async (contactId) => {
  try {
    const dataFromDB = await fs.readFile("./models/contacts.json");
    const contact = JSON.parse(dataFromDB).find((el) => el.id === contactId);
    if (contact) {
      return { body: contact, type: "succes" };
    }
  } catch (err) {
    return { type: "error", body: err.msg };
  }
};

const removeContact = async (contactId) => {
  try {
    const dataFromDB = await fs.readFile("./models/contacts.json");
    const contacts = JSON.parse(dataFromDB);
    if (contacts.find((el) => el.id === contactId)) {
      const newContacts = JSON.parse(dataFromDB).filter(
        (el) => el.id !== contactId
      );
      await fs.writeFile("./models/contacts.json", JSON.stringify(newContacts));
      return { body: "contact deleted", type: "succes" };
    }
    return { body: "Not found", type: "error" };
  } catch (err) {
    return { type: "error", body: err.msg };
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const dataFromDB = await fs.readFile("./models/contacts.json");
    const contacts = JSON.parse(dataFromDB);
    const newContact = {
      id: uuid(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await fs.writeFile("./models/contacts.json", JSON.stringify(contacts));
    return { body: newContact, type: "succes" };
  } catch (err) {
    return { type: "error", body: err.msg };
  }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const dataFromDB = await fs.readFile("./models/contacts.json");
  const contacts = JSON.parse(dataFromDB);
  if (!contacts.find((el) => el.id === contactId)) {
    return { body: "not found", type: "error" };
  }
  const newContacts = contacts.map((el) => {
    if (el.id === contactId) {
      const updatedContact = {...el};
      if (name) {
        updatedContact.name = name;
      }
      if (email) {
        updatedContact.email = email;
      }
      if (phone) {
        updatedContact.phone = phone;
      }
      return updatedContact;
    }
    return el;
  });
  await fs.writeFile("./models/contacts.json", JSON.stringify(newContacts));
  return { body: { ...body, id: contactId }, type: "succes" };

};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
