const { 
  getContacts, 
  getContactById, 
  addContact, 
  deleteContactById,
  putContactById,
  updateStatusContactById
 } = require("../services/contactsServices");

const getContactsController = async (req, res, next) => {  
  const contacts = await getContacts();
  res.json(contacts);
};

const getContactByIdController = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(contact);
};

const addContactController = async (req, res) => {
  const { name, phone, email, favorite } = req.body;
  await  addContact({ name, phone, email, favorite} );  
  res.status(201).json({ status: "success" });
};

const deleteContactController = async (req, res, next) => {
  const id = req.params.contactId;  
  await deleteContactById(id);
  res.json({ status: "success" });
};

const putContactController = async (req, res, next) => {
  const id = req.params.contactId;
  const { name, email, phone } = req.body;
  await putContactById(id, { name, email, phone });
  res.json({ status: "success" });
};

const patchContactController = async (req, res, next) => {
  const id = req.params.contactId;
  const { favorite } = req.body;

  const contact = await updateStatusContactById(id, { favorite });
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json({ contact });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  putContactController,
  patchContactController,
};
