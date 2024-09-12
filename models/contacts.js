const fs = require('fs/promises');
const { v4 } = require("uuid");
const path = require("path");
const contactsPath = path.resolve(__dirname, "./contacts.json");

const listContacts = async (req, res) => {
 try {
   const data = await fs.readFile(contactsPath, "utf-8");
   const contacts = JSON.parse(data);

   res.json(contacts);
 } catch (error) {
   console.error(error.message);
   res.status(404).json({ error: "Error!" });
 }
}

const getContactById = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const { contactId } = req.params;
    const foundContact = contacts.find((contact) => contact.id === contactId);

    if (foundContact) {
      res.send(foundContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
    
  }
  catch (error) {
    console.error(error.message)
  }
};

const addContact = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const contact = req.body;

    if (contact.name && contact.email && contact.phone) {
      contacts.push({ ...contact, id: v4() });
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      res.status(201).send(`Contact with the name ${contact.name} added to the  database!`);
    }
    else {
       res.status(404).json({ message: "missing required name field" });
    }
  }
  catch (error) {
    console.error(error.message)
  }
}
const removeContact = async (req, res) => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);

  const { contactId } = req.params;

  if (contacts.some((contact) => contact.id === contactId)) {
    const newContactList = contacts.filter((contact) => contact.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newContactList));
    res.status(200).send({message: "contact deleted"});
  }
  else {
    res.status(404).send({ message: "Not found" });
  }
  
 
};

const updateContact = async (req, res) => {
   const data = await fs.readFile(contactsPath, "utf-8");
   const contacts = JSON.parse(data);
  const { contactId } = req.params;
  const contact = req.body;

  if (contact.name && contact.phone && contact.email) {
    const dataToUpDate = { ...contact, id: contactId };

    const indexToUpDate = contacts.findIndex((user) => user.id === contactId);

    contacts[indexToUpDate] = dataToUpDate;
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    res.send(contact)
  }
  else {
    res.status(400).send({ message: "missing fields" });
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
}
