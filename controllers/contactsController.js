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
    res.status(200).json(contacts);
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

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: { ...error, message: error.message } });
  }
};

const newContact = async (req, res) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: { ...error, message: error.message } });
  }
};

const putContact = async (req, res) => {
  const contactId = req.params.contactId;
  const body = req.body;

  try {
    const isContactUpdated = await updateContact(contactId, body);

    if (!isContactUpdated) {
      return res.status(404).json({
        error: `Sorry, there is no contact with id: ${contactId}`,
      });
    }
    res.status(200).json({ id: contactId, ...body });
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

    res.status(200).json(contact);
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
