const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  optionaUpdatelContact,
} = require("../models/contacts");

const getContactsList = async (req, res, next) => {
  const contactsList = await listContacts();
  res.json({ message: contactsList });
};

const contactById = async (req, res, next) => {
  const id = req.params.contactId;
  const contactById = await getContactById(id);
  if (contactById === null) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: contactById });
};
const addNewContact = async (req, res, next) => {
  const { body } = req;
  const contactAdd = await addContact(body);
  res.status(201).json({ message: contactAdd });
};
const deleteContact = async (req, res, next) => {
  const id = req.params.contactId;
  const contactRemovedById = await removeContact(id);
  if (contactRemovedById === null) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: "contact deleted" });
};
const contactUpdate = async (req, res, next) => {
  const {
    body,
    params: { contactId },
  } = req;

  const contactUpdated = await updateContact(contactId, body);
  if (contactUpdated === null) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: contactUpdated });
};
const changeContact = async (req, res, next) => {
  const {
    body,
    params: { contactId },
  } = req;

  const contactUpdated = await optionaUpdatelContact(contactId, body);
  if (contactUpdated === null) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: contactUpdated });
};

module.exports = {
  getContactsList,
  contactById,
  addNewContact,
  deleteContact,
  contactUpdate,
  changeContact,
};
