const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.resolve(__dirname, "contacts.json");

const listContacts = async (req, res) => {
  try {
   const data = await fs.readFile(contactsPath);
const contacts = JSON.parse(data);

    res.status(200).json({
      contacts,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
};



const getContactById = async (req, res) => {
  try {
    const { contactId  } = req.params;

const contacts = await listContacts();
const result = contacts.find(item => item.id === contactId);

    res.status(200).json({
      result,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
};


const removeContact = async (req, res) => {
  try {
const { contactId } = req.params;

const contacts = await listContacts();
const NewContactList = contacts.filter(item => item.id !== contactId); 
fs.writeFile(contactsPath, JSON.stringify(NewContactList));

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
};


const addContact = async (req, res) => {
  try {
     const { name, email, phone } = req.body;

const contacts = await listContacts();
const newContacts = { id: v4(), name, email, phone};

   contacts.push(newContacts);

await fs.writeFile(contactsPath, JSON.stringify(contacts));

    res.status(201).json({
      contact: newContacts,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
};

const updateContact = async (req, res) => {
  try {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const contacts = await listContacts();

  const contact = contacts.find(item => item.id === contactId); 

  if (name) contact.name = name;
  if (email) contact.email = email;
  if (phone) contact.phone = phone;

  const contactIdx = contacts.findIndex(item => item.id === contactId);
  contacts[contactIdx] = contact;

fs.writeFile(contactsPath, JSON.stringify(contacts));

    res.status(200).json({
      contact,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
};



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
