const {
  listContacts,
  getContactById,
  addContact,
} = require("../../models/contactsModels.js");

const getContacts = async (req, res) => {
  const contacts = await listContacts();
  //   console.log(contacts);
  res.status(200).json({
    contacts,
    status: "success",
  });
};

const getContactByIdController = async (req, res) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (!contact) {
    return res.status(404).json({ message: "Not found!" });
  }
  return res.json({ contact });
};

const postContact = async (req, res) => {
  const { name, email, phone } = req.body;
  //   console.log(req.params);
  //   if (!name || !email || !phone) {
  //     return res.status(400).json({ message: "missing required name field" });
  //   }
  const id = new Date().getTime().toString();

  const newContact = await addContact({ name, email, phone, id });
  //   console.log(newContact);
};

module.exports = {
  getContacts,
  getContactByIdController,
  postContact,
};
