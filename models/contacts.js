const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.resolve(__dirname, "./contacts.json");


const listContacts = async () => {
  try {
    const response = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(response);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const find = contacts.filter((el) => el.id === contactId);
    return find
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const rem = contacts.filter((el) => el.id !== contactId);
    const del = contacts.filter((el) => el.id === contactId);
    fs.writeFile(contactsPath, JSON.stringify(rem));
    return del
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contacts = await listContacts()
    const { name, email, phone } = req.body;
    if (name && email && phone) {
      const newContact = { id: uuidv4(), name, email, phone };
      fs.writeFile(contactsPath, JSON.stringify([newContact, ...contacts]));
      res.status(201).json(newContact);
    } else res.status(400).json({ message: "missing required name field" });
    // const  { name, email, phone} = body;
    // console.log(body);
    //   const newContact = { id: uuidv4(), name,email, phone}
    //   fs.writeFile(contactsPath, JSON.stringify([newContact, ...contacts]))
    // return newContact
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contacts = await listContacts()
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
      fs.writeFile(contactsPath, JSON.stringify(contacts));
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
