const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../services/contactsService");

const getContactsController = async (req, res) => {
  try {
    const contacts = await getContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);

  res.status(200).json(contact);
};

const addContactController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  await addContact(name, email, phone, favorite);

  res.status(201).json({ message: "Contact created" });
};

const removeContactController = async (req, res) => {
  const { id } = req.params;
  await removeContact(id);
  res.status(200).json({ message: "Contact deleted" });
};

const updateContactController = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;
  await updateContact(id, { name, email, phone, favorite });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
};
