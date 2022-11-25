const service = require("../services/contactsService");
const getValidation = require("../middlewares/validationMiddlewares");

const listContacts = async (res) => {
  try {
    const results = await service.getAllContacts();
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getContactById = async (contactId, res) => {
  try {
    const results = await service.getContactById(contactId);
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const removeContact = async (contactId, res) => {
  try {
    const results = await service.removeContact(contactId);
    if (!results) res.status(404).json({ message: "Not found" });
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addContact = async (req, res) => {
  const bodyIsValid = getValidation.addContactValid(req.body);

  if (bodyIsValid.error) {
    res.status(400).json({ message: bodyIsValid.error.message });
    return;
  }

  try {
    const results = await service.createContact(req.body);
    res.status(201).json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateContact = async (contactId, body, res) => {
  const bodyIsValid = getValidation.updateContactValid(body);

  if (bodyIsValid.error) {
    res.status(400).json({ message: bodyIsValid.error.message });
    return;
  }

  try {
    const results = await service.updateContact(contactId, body);
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateStatusContact = async (contactId, body, res) => {
  const bodyIsValid = getValidation.updateStatusValid(body);

  if (bodyIsValid.error) {
    res.status(400).json({ message: bodyIsValid.error.message });
    return;
  }

  try {
    const results = await service.updateStatusContact(contactId, body);
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
