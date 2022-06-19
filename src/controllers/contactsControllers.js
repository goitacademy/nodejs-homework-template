const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getOneById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    contact
      ? res.status(200).json(contact)
      : res.status(400).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const postNew = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    console.log(contact);
    contact
      ? res.status(200).json({ message: `contact: ${contact.name} is deleted` })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const putById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const updatedContact = await updateContact(contactId, req.body);
    updatedContact
      ? res.status(200).json(updatedContact)
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOneById,
  postNew,
  deleteById,
  putById,
};
