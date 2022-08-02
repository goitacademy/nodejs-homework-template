const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContactById,
  updateStatusContact,
} = require("../services/contactsService");

const getContactsController = async (req, res) => {
  const contacts = await getContacts();
  res.json({ contacts });
};

const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const contact = await getContactById(id);

  res.json({ contact, status: "succes" });
};

const addContactController = async (req, res) => {
  const { name, email, phone } = req.body;
  await addContact({ name, email, phone });

  res.json({ status: "success" });
};

const updateContactController = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  await updateContact(id, { $set: { name, email, phone } });

  res.json({ status: "success" });
};

const removeContactController = async (req, res) => {
  const { id } = req.params;
  await removeContactById(id);

  res.json({ status: "success" });
};

const updateStatusContactController = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  await updateStatusContact(id, { favorite });

  res.json({ status: "success" });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  removeContactController,
  updateStatusContactController,
};
