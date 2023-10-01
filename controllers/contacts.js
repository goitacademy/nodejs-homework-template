const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../models/contacts");
const validation = require("../helpers/validation");

exports.listContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

exports.getContactById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(id);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

exports.addContact = async (req, res, next) => {
  const { body } = req;

  if (!body.name) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }

  try {
    const { error } = validation.contactSchema.validate(body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const newContact = await addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

exports.updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  if (!body || Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  try {
    const updatedContact = await updateContact(id, body);

    if (!updatedContact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

exports.removeContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(id);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    await removeContact(id);
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};
