const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const normalizedPath = path.resolve(__dirname, "./contacts.json");

const getContactsFromFile = async () => {
  const contacts = await fs.readFile(normalizedPath);
  const normalizedContacts = JSON.parse(contacts);
  return normalizedContacts;
};

const listContacts = async (req, res) => {
  try {
    const contacts = await getContactsFromFile();
    res.json(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (req, res) => {
  try {
    const id = req.params.contactId;
    const cont = await getContactsFromFile();
    const filtCont = cont.filter((el) => el.id === id);
    if (!filtCont.length) res.status(404).json({ message: "Not found" });
    else res.json(...filtCont);
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contacts = await getContactsFromFile();
    const isContactExist = contacts.some((el) => el.id !== id);
    if (isContactExist) {
      const newContacts = contacts.filter((el) => el.id !== id);
      fs.writeFile(normalizedPath, JSON.stringify(newContacts));
      res.json({ message: "contsct deleted" });
    } else res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contacts = await getContactsFromFile();
    const { name, email, phone } = req.body;
    if (name && email && phone) {
      const newContact = { id: uuidv4(), name, email, phone };
      fs.writeFile(normalizedPath, JSON.stringify([newContact, ...contacts]));
      res.status(201).json(newContact);
    } else res.status(404).json({ message: "missing required name field" });
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contacts = await getContactsFromFile();
    const id = req.params.contactId;
    const isContactExist = contacts.some((el) => el.id === id);
    const { name, email, phone } = req.body;

    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "missing fields" });
    } else if (!isContactExist) res.status(404).json({ message: "Not found" });
    else {
      contacts.forEach((el) => {
        if (el.id === id) {
          el.name = name || el.name;
          el.email = email || el.email;
          el.phone = phone || el.phone;
        }
      });
      fs.writeFile(normalizedPath, JSON.stringify(contacts));
      const updCont = contacts.filter((el) => el.id === id);
      res.json(updCont);
    }
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
