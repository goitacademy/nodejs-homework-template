const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("./models", "contacts.json");

const listContacts = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    res.json({ contacts, status: "Success" });
  } catch (err) {
    console.log(err.message);
  }
};

const getById = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    const contacts = JSON.parse(data);

    const contact = contacts.find((item) => item.id === req.params.contactId);
    res.json({ contact, status: "Success" });

    if (!contact) {
      res.status(400).json({
        status: `Failure, we didn't find the contact width id=${req.params.contactId}`,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const { name, email, phone } = req.body;
    contacts.push({ id: new Date().getTime().toString(), name, email, phone });

    const newContacts = JSON.stringify(contacts, null, " ");

    const write = await fs.writeFile(
      contactsPath,
      newContacts,
      "utf8",
      (err) => {
        if (err) throw err;
      }
    );
    res.json({ status: "Success" });
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContacts = JSON.stringify(
      contacts.filter((contact) => req.params.contactId !== contact.id),
      null,
      " "
    );

    const write = await fs.writeFile(
      contactsPath,
      newContacts,
      "utf8",
      (err) => {
        if (err) throw err;
      }
    );
    res.json({ status: "Success" });
  } catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const { name, email, phone } = req.body;
    contacts.forEach((contact) => {
      if (Number(contact.id) === Number(req.params.contactId)) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
      }
    });

    const newContacts = JSON.stringify(contacts, null, " ");

    const write = await fs.writeFile(
      contactsPath,
      newContacts,
      "utf8",
      (err) => {
        if (err) throw err;
      }
    );
    res.json({ status: "Success" });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
