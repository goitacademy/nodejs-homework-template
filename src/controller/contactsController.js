const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");

async function getUserContacts(req, res) {
  const contacts = await listContacts(req.query, req.userId);
  res
    .status(200)
    .json(
      contacts.length === 0 ? { message: "No contacts found" } : { contacts }
    );
}
async function getUserContactById(req, res) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.userId);
  if (!contact) {
    res
      .status(404)
      .json({ message: `Contact with id:${contactId} does not exist` });
    return;
  }
  res.status(200).json({ contact });
}
async function postContact(req, res) {
  const contact = await addContact(req.body, req.userId);
  res.status(201).json({ contact });
}

async function deletContact(req, res) {
  const { contactId } = req.params;
  const contact = await removeContact(contactId, req.userId);
  if (!contact) {
    res
      .status(404)
      .json({ message: `Contact with id:${contactId} does not exist` });
    return;
  }
  res.status(200).json({ message: "contact deleted" });
}

async function updateContactById(req, res) {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body, req.userId);
  if (!contact) {
    res
      .status(404)
      .json({ message: `Contact with id:${contactId} does not exist` });
    return;
  }
  res.status(200).json({ contact });
}

async function updateContactStatusById(req, res) {
  const { contactId } = req.params;
  const contact = await updateStatusContact(contactId, req.body, req.userId);
  if (!contact) {
    res
      .status(404)
      .json({ message: `Contact with id:${contactId} does not exist` });
    return;
  }
  res.status(200).json({ contact });
}

module.exports = {
  getUserContacts,
  getUserContactById,
  postContact,
  deletContact,
  updateContactById,
  updateContactStatusById,
};
