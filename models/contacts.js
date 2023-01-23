const fs = require("fs/promises");
const path = require("path");

const contactPath = path.join(__dirname, "contacts.json");

const listContacts = async (req, res) => {
  try {
    const contacts = await fs.readFile(contactPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);

    if (!parsedContacts.length) {
      console.log("no contacts");
      return res.status(404).json({ message: "no contacts found", code: 404 });
    }

    res.json({ message: "list of contacts", code: 200, parsedContacts });
    console.table(parsedContacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
