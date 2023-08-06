const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const contactsPath = require("path").join(__dirname, "./contacts.json");

const errorHandler = (res, error) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
};

const validateContact = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  const { error } = schema.validate(data);
  return error ? error.details[0].message : null;
};

const listContacts = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    res.status(200).json(contacts);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getContactById = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((item) => item.id === req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    errorHandler(res, error);
  }
};

const addContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const validationError = validateContact({ name, email, phone });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    res.status(201).json(newContact);
  } catch (error) {
    errorHandler(res, error);
  }
};

const removeContact = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const index = contacts.findIndex(
      (contact) => contact.id === req.params.contactId
    );
    if (index === -1) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const contactId = req.params.contactId;

    if (!name && !email && !phone) {
      return res
        .status(400)
        .json({ message: "At least one field should be updated" });
    }

    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (phone) updatedFields.phone = phone;

    const updatedContact = { ...contacts[index], ...updatedFields };
    contacts[index] = updatedContact;

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    res.status(200).json(updatedContact);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
