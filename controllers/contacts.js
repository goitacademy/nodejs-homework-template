const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../models/contacts");

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

  if (!body.email) {
    res.status(400).json({ message: "missing required email field" });
    return;
  }

  if (!body.phone) {
    res.status(400).json({ message: "missing required phone field" });
    return;
  }

  try {
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
    res.status(400).json({
      message: "missing fields",
    });
    return;
  }

  const requiredFields = ["name", "email", "phone"];
  const missingFields = requiredFields.filter((field) => !(field in body));

  if (missingFields.length > 0) {
    res.status(400).json({
      message: `missing required ${missingFields.join(", ")} field`,
    });
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
