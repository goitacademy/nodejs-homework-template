const {
  getContacts,
  addContact,
  getContactById,
  deleteContactById,
  putContactById,
  updateStatusContact,
} = require("../services/contactsService");

const getContactsController = async (req, res) => {
  const { id: owner } = req.user;
  let { page = 1, limit = 20, favorite } = req.query;
  limit = limit > 20 ? 20 : Number(limit);
  const skip = (page - 1) * limit;
  const data = await getContacts(owner, { skip, limit }, favorite);
  res.json({ data, page });
};

const addContactController = async (req, res) => {
  const { name, email, phone } = req.body;
  const { id: owner } = req.user;
  const data = await addContact({ name, email, phone }, owner);
  res.status(201).json(data);
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { id: owner } = req.user;
  const data = await getContactById(contactId, owner);
  if (!data) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ data });
};

const deleteContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { id: owner } = req.user;
  await deleteContactById(contactId, owner);
  res.json({ message: "contact deleted" });
};

const putContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const { id: owner } = req.user;
  const data = await putContactById(contactId, { name, email, phone }, owner);
  res.json({ data });
};

const updateStatusContactController = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { id: owner } = req.user;
  const data = await updateStatusContact(contactId, favorite, owner);
  res.json({ data });
};

module.exports = {
  getContactsController,
  addContactController,
  getContactByIdController,
  deleteContactByIdController,
  putContactByIdController,
  updateStatusContactController,
};
