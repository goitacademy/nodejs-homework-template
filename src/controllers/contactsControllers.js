const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  togleFavorite,
} = require("../models/contacts");
const { WrongParametrsError } = require("../middlewares/helpers/errors");

const getAll = async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

const getOneById = async (req, res) => {
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

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  contact
    ? res.status(200).json({ message: `contact: ${contact.name} is deleted` })
    : res.status(404).json({ message: "Not found" });
};

const putById = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new WrongParametrsError("missing fields");
  }
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);
  updatedContact
    ? res.status(200).json(updatedContact)
    : res.status(404).json({ message: "Not found" });
};

const patchFavotite = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new WrongParametrsError("missing field favorite");
  }
  const { contactId } = req.params;
  const updatedContact = await togleFavorite(contactId, req.body);
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
  patchFavotite,
};
