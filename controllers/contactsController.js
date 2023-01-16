const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../models/contacts");

const getContacts = async (req, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ contacts, status: "success" });
  } catch (error) {
    res.status(500).json({ error: { ...error, message: error.message } });
  }
};

const getContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      return res
        .status(404)
        .json({ error: `Sorry, there is no contact with id: ${contactId}` });
    }

    res.status(200).json({ contact, status: "success" });
  } catch (error) {
    res.status(500).json({ error: { ...error, message: error.message } });
  }
};

const newContact = async (req, res) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json({ contact: newContact, status: "success" });
  } catch (error) {
    res.status(500).json({ error: { ...error, message: error.message } });
  }
};

const putContact = async (req, res) => {
  try {
    const updatedContact = await updateContact(req.params.contactId, req.body);
    res.status(200).json({ contact: updatedContact, status: "success" });
  } catch (error) {
    res.status(500).json({ error: { ...error, message: error.message } });
  }
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await removeContact(contactId);

    if (!contact) {
      return res.status(404).json({
        error: `Sorry, there is no contact with id: ${contactId}`,
      });
    }

    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(500).json({ error: { ...error, message: error.message } });
  }
};

module.exports = {
  getContacts,
  newContact,
  getContact,
  putContact,
  deleteContact,
};
