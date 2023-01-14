const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("../../models/contactsModels.js");

const getContacts = async (req, res) => {
  const contacts = await listContacts();

  res.status(200).json({
    contacts,
    status: "success",
  });
};

const getContactByIdController = async (req, res) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (contact.length === 0) {
    return res.status(404).json({ message: "Not found!" });
  }
  return res.json({ contact });
};

const postContact = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }
  const contactsArray = await listContacts();
  const id = (contactsArray.length + 1).toString();

  const newContact = await addContact({ name, email, phone, id });

  res.status(200).json({ newContact });
};

const deleteContact = async (req, res) => {
  const id = req.params.contactId;
  //   console.log(id);
  const contacts = await removeContact(id);
  if (!contacts) {
    return res.status(404).json({ message: "Not found" });
  }
  //   console.log(contacts);
  res.status(200).json({ message: "contact is deleted" });
};

module.exports = {
  getContacts,
  getContactByIdController,
  postContact,
  deleteContact,
};
