const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactElement,
} = require("../models/index");

const getContacts = async (req, res) => {
  const contacts = await listContacts();

  res.status(200).json({
    contacts,
    status: "success",
  });
};

const getContactByIdController = async (req, res) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (contact === null) {
    return res.status(404).json({ message: "Not found!" });
  }
  return res.json({ contact });
};

const postContact = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }

  const newContact = await addContact({ name, email, phone });
  if (newContact === null) {
    return res.status(400).json({ message: "missing required name field" });
  }
  res.status(200).json({ newContact });
};

const putContact = async (req, res) => {
  const id = req.params.contactId;
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing fields" });
  }
  const contact = await updateContact(id, { name, email, phone });
  if (!contact) {
    return res.status(404).json({ message: "Not found!" });
  }
  res.status(200).json({ contact });
};

const patchContact = async (req, res) => {
  const id = req.params.contactId;
  const { favorite } = req.body;

  const contact = await updateContactElement(id, { favorite });

  if (!favorite) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ contact });
};

const deleteContact = async (req, res) => {
  const id = req.params.contactId;

  const contacts = await removeContact(id);

  if (!contacts) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact is deleted" });
};

module.exports = {
  getContacts,
  getContactByIdController,
  postContact,
  deleteContact,
  putContact,
  patchContact,
};
