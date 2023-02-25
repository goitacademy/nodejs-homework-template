const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
  updateStatusContactbyId,
} = require("../models/contactsService");

const {
  addContactSchema,
  updateContactSchema,
  updateStatusSchema,
} = require("../schemas/joiValidate");

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
  const contact = { name, email, phone };
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
const updateStatusContact = tryCatchWrapper(async (req, res) => {
  const { error } = updateStatusSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const data = await updateStatusContactbyId(req.params.contactId, req.body);
  if (!data) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.json(data);
});
module.exports = {
  getContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
