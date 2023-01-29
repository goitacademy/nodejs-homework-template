const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  patchContact,
} = require("../service/contactsService");

const get = async (req, res, next) => {
  const contacts = await getContacts();
  res.json(contacts);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  res.json(contact);
};

const add = async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  await removeContact(contactId);
  res.json({ message: `Contact with ${contactId} deleted` });
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  await updateContact(contactId, req.body);
  const updateData = await getContactById(contactId);
  res.status(200).json(updateData);
};

const patch = async (req, res, next) => {
  const { contactId } = req.params;
  await patchContact(contactId, req.body);
  const newContact = await getContactById(contactId);

  res.status(200).json(newContact);
};

module.exports = {
  get,
  getById,
  add,
  remove,
  update,
  patch,
};
