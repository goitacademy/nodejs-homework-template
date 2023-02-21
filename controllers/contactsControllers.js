const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
} = require("../models/contacts");
const { v4: uuidv4 } = require("node-uuid");
const { addContactSchema, updateContactSchema } = require("../schemas/joi");

const tryCatchWrapper = (fn) => async (req, res) => {
  try {
    const result = await fn(req, res);
    return result;
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const getContacts = tryCatchWrapper(async (req, res) => {
  const data = await listContacts();
  res.json(data);
});

const getOneContact = tryCatchWrapper(async (req, res) => {
  const data = await getContactById(req.params.contactId);
  if (data.length === 0) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(data);
});
const createContact = tryCatchWrapper(async (req, res) => {
  const { error, value } = addContactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { name, email, phone } = value;
  const contact = { id: uuidv4(), name, email, phone };
  const data = await addContact(contact);
  res.status(201).json(data);
});
const deleteContact = tryCatchWrapper(async (req, res) => {
  const contacts = await listContacts();
  if (contacts.every(({ id }) => id !== req.params.contactId)) {
    return res.status(404).json({ message: "Not found" });
  }
  const data = await removeContact(req.params.contactId);
  res.json({
    message: `Contact with ID:${data.id} name:${data.name} deleted!`,
  });
});
const updateContact = tryCatchWrapper(async (req, res) => {
  const { name, email, phone } = req.body;
  if (name || email || phone) {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const data = await updateContactById(req.params.contactId, req.body);
    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(data);
  }
  return res.status(400).json({ message: "Missing required name field" });
});
module.exports = {
  getContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact,
};
