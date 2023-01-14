const contacts = require("../data/contacts.json");

const listContacts = async (req, res) => {
  res.send(contacts);
};
const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = contacts.filter((contact) => contact.id === id);

  res.status(201).json({ contact });
}  
const removeContact = async (req, res) => {
  const { id } = req.params;
  console.log("----contact deleted", id);
  // res.status(204).json({ });
}  
const addContact = async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  const newContact = {
    id: Date.now(),
    name,
    email,
    phone,
  };
  console.log("-contact add to db", newContact);
  res.status(201).json({ newContact });
} 
const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const oldContact = contacts.filter((contact) => contact.id === req.params.id);
  console.log("-contact old", oldContact);
  const updatedContact = {
    id,
    name,
    email,
    phone,
  };
  console.log("-contact updated", updatedContact);
  res.status(200).json({ updatedContact });
}  

module.exports = { listContacts, getContactById, removeContact, addContact, updateContact};