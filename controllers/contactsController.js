const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const path = require("path");

const contactsPath = path.join("models", "contacts.json");

const listContacts = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    res.send(contacts);
  } catch (error) {
    return console.log(error);
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  return fs.readFile(contactsPath, "utf-8").then((data) => {
    const contacts = JSON.parse(data).filter((elem) => elem.id === contactId);
    res.send(contacts);
  });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  const contactToDel = contacts.find((elem) => elem.id === contactId);
  contacts.splice(contacts.indexOf(contactToDel), 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  res.status(200).json({ message: "contact deleted" });
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  const contact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  const contactToEdit = contacts.find((elem) => elem.id === contactId);
  const editedContact = contactToEdit;
  if (body.name) {
    editedContact.name = body.name;
  } else if (body.email) {
    editedContact.email = body.email;
  } else if (body.phone) {
    editedContact.phone = body.phone;
  }
  contacts.splice(contacts.indexOf(contactToEdit), 1, editedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  res.send(editedContact);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
