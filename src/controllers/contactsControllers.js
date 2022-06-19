const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");
const { WrongParametrsError } = require("../middlewares/helpers/errors");

const getAll = async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

const getOneById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  contact
    ? res.status(200).json(contact)
    : res.status(400).json({ message: `no contact with id ${contactId}` });
};

const postNew = async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  contact
    ? res.status(200).json({ message: `contact: ${contact.name} is deleted` })
    : res.status(404).json({ message: "Not found" });
};

const putById = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw new WrongParametrsError("missing fields");
  }
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);
  console.log("updated contact : ", updatedContact);
  updatedContact
    ? res.status(200).json(updatedContact)
    : res.status(404).json({ message: "Not found" });
};

module.exports = {
  getAll,
  getOneById,
  postNew,
  deleteById,
  putById,
};
