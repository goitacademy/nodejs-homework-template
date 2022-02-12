const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parseContacts = JSON.parse(contacts);
    return parseContacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.filter((contact) => contact.id === contactId);
    return contactById;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  let result = {};
  try {
    const contacts = await listContacts();
    const contactToDelete = contacts.find(
      (contact) => contact.id === contactId
    );

    if (contactToDelete === undefined) {
      result = { message: "Not found", status: 404 };
      return result;
    }

    const newContactsList = JSON.stringify(
      contacts.filter((contact) => contact.id !== contactId)
    );
    await fs.writeFile(contactsPath, newContactsList, "utf-8");
    result = { message: "contact deleted", status: 200 };
    return result;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContactsList = JSON.stringify([...contacts, body]);
    return await fs.writeFile(contactsPath, newContactsList, "utf-8");
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contactById = await getContactById(contactId);

    if (contactById.length === 0) {
      return { status: 400, result: "Not found" };
    }

    const updateContactById = { ...contactById[0], ...body };

    const updateContactsList = contacts.map((contact) => {
      if (contact.id === contactId) {
        contact.name = body.name;
        contact.email = body.email;
        contact.phone = body.phone;

        return contact;
      }

      return contact;
    });

    await fs.writeFile(
      contactsPath,
      JSON.stringify(updateContactsList),
      "utf-8"
    );

    return { status: 200, result: updateContactById };
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
