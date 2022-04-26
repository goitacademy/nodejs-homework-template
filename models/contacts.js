const fs = require("fs/promises");
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    
    const normContacts = JSON.parse(contacts);
   
    return normContacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.filter((item) => item.id === contactId);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter((item) => item.id !== contactId);
    const delContacts = contacts.filter((item) => item.id === contactId);
    fs.writeFile(contactsPath, JSON.stringify(newContacts));

    return delContacts;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    const { name, email, phone } = req.body;

    if (name && email && phone) {
      const newContact = { name, email, phone, id: uid(3) };

      fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]));
      res.status(201).json(newContact);
    } else {
      res.status(400).json({ message: "missing required name field" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    const id = req.params.contactId;
    const editContact = contacts.filter((item) => item.id === id);
    const { name, email, phone } = req.body;
    if (!editContact) {
      res.status(404).json({ message: "Not found" });
    } else {
      contacts.forEach((item) => {
        if (item.id === id) {
          item.email = email || item.email;
          item.name = name || item.name;
          item.phone = phone || item.phone;
        }
      });
    }
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    const updCont = contacts.filter((el) => el.id === id);
    res.status(200).json(updCont);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
