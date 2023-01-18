const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");


async function getContacts(req, res, next) {
  try {
    const contacts = await listContacts();
    console.log("contacts:", contacts);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
}

async function getContact(req, res, next) {
  try {
    const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    console.log("contact:", contact);
    return res.status(200).json(contact);
  }
  return res.status(404).json({ message: "Not found" });
  }
  catch (error) {
    next(error)
  }
  
}

async function createContact(req, res, next) {
  try {
    const { name, email, phone } = req.body;
  const newContact = await addContact({ name, email, phone });
  console.log("newContact:", newContact);
  return res.status(201).json(newContact);
  }
  catch (error) {
    next(error)
  }
}

async function deleteContact(req, res, next) {
  try {
    const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  await removeContact(contactId);
  return res.status(200).json({ message: `contact ${contactId} deleted` });
  }
  catch (error) {
    next(error)
  }
}

async function changeContact(req, res, next) {
  try {
    const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const updatedContact = await updateContact(contactId, { name, email, phone });
  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" }); 
  }
  return res.status(200).json(updatedContact);
  }
  catch (error) {
    next(error)
  }
}

module.exports = {
  getContacts,
  getContact,
  deleteContact,
  createContact,
  changeContact,
};
