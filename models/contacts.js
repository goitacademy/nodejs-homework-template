const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

// GET ALL
const listContacts = async (req, res, next) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));

    return res.json({ contacts, status: "200" });
  } catch (e) {
    console.log(e);
  }
};

// GET BY ID
const getContactById = async (req, res, next) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const { contactId } = req.params;
    const [contact] = contacts.filter((contact) => contact.id === contactId);

    if (!contact) {
      return res.json({ message: "Not found", status: "404" });
    }

    return res.json({ contact, status: "200" });
  } catch (e) {
    console.log(e);
  }
};

// ADD CONTACT
const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name) {
      return res.json({
        message: "missing required name field",
        status: "400",
      });
    }
    if (!email) {
      return res.json({
        message: "missing required email field",
        status: "400",
      });
    }
    if (!phone) {
      return res.json({
        message: "missing required phone field",
        status: "400",
      });
    }

    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const id = nanoid();
    const contact = { id, name, email, phone };

    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");

    return res.json({ contact, status: "201" });
  } catch (e) {
    console.log(e);
  }
};

// DELETE CONTACT
const removeContact = async (req, res, next) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const { contactId } = req.params;

    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      return res.json({ message: "Not found", status: "404" });
    }

    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");

    return res.json({ message: "contact deleted", status: "200" });
  } catch (e) {
    console.log(e);
  }
};

// UPDATE CONTACT
const updateContact = async (req, res, next) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
      return res.json({ message: "missing fields", status: "400" });
    }

    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return res.json({ message: "Not found", status: "404" });
    }

    const updatedContact = { ...contacts[index], ...req.body };
    contacts[index] = updatedContact;
    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");

    return res.json({ updatedContact, status: "200" });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
