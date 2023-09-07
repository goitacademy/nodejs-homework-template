const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const Joi = require("joi");

const schema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^\d{3}-\d{3}-\d{4}$/)
    .required(),
});

const contactsPath = path.join(process.cwd(), "models", "contacts.json");
const delContactsPath = path.join(
  process.cwd(),
  "models",
  "deleteContacts.json"
);

const listContacts = async (req, res, next) => {
  const contactsAll = await readContacts(contactsPath);
  return res.status(200).json(contactsAll);
};

const getContactById = async (req, res, next) => {
  const contactsAll = await readContacts(contactsPath);
  const contact = contactsAll.find(
    (contact) => contact.id === req.params.contactId
  );
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};

const removeContact = async (req, res, next) => {
  const contactsAll = await readContacts(contactsPath);
  const delContactsAll = await readContacts(delContactsPath);
  const indexContact = contactsAll.findIndex(
    (contact) => contact.id === req.params.contactId
  );
  if (indexContact === -1) {
    return res.status(404).json({ message: "Not found" });
  }

  const [del] = contactsAll.splice(indexContact, 1);
  delContactsAll.unshift(del);
  await reWriteCOntacts(delContactsPath, delContactsAll);
  await reWriteCOntacts(contactsPath, contactsAll);
  return res.status(200).json({ message: "contact deleted" });
};

const addContact = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      message: `Error in required field: ${error.details[0].path[0]}`,
    });
  }
  const contactsAll = await readContacts(contactsPath);
  const newContact = { id: crypto.randomUUID(), ...req.body };
  contactsAll.unshift(newContact);
  await reWriteCOntacts(contactsPath, contactsAll);
  return res.status(201).json(newContact);
};

const updateContact = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      message: `Error in required field: ${error.details[0].path[0]}`,
    });
  }
  const contactsAll = await readContacts(contactsPath);
  const delContactsAll = await readContacts(delContactsPath);
  const indexContact = contactsAll.findIndex(
    (contact) => contact.id === req.params.contactId
  );
  if (indexContact === -1) {
    return res.status(400).json({ message: "Contact not found" });
  }
  if (!req.body) {
    return res.status(400).json({ message: "missing fields" });
  }

  delContactsAll.unshift(contactsAll[indexContact]);
  contactsAll[indexContact] = { ...contactsAll[indexContact], ...req.body };
  await reWriteCOntacts(delContactsPath, delContactsAll);
  await reWriteCOntacts(contactsPath, contactsAll);
  return res.status(404).json(contactsAll[indexContact]);
};

async function readContacts(file) {
  const data = await fs.readFile(file);
  return JSON.parse(data);
}

async function reWriteCOntacts(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
