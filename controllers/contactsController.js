const { 
  getContacts, 
  getContactById, 
  addContact, 
  deleteContactById,
  putContactById,
  updateStatusContactById
 } = require("../services/contactsServices");

const getContactsController = async (req, res, next) => {  
  const {_id: userId} = req.user;
  const contacts = await getContacts(userId);
  res.json(contacts);
};

const getContactByIdController = async (req, res, next) => {
  const {_id: userId} = req.user;
  const id = req.params.contactId;
  console.log(userId, id);
  const contact = await getContactById(id, userId);
  res.json(contact);
};

const addContactController = async (req, res) => {
  const {_id: userId} = req.user;
  const { name, phone, email, favorite } = req.body;
  const contact = await  addContact({ name, phone, email, favorite}, userId );  
  res.status(201).json(contact );
};

const deleteContactController = async (req, res, next) => {
  const {_id: userId} = req.user;
  const id = req.params.contactId;  
  await deleteContactById(id, userId);
  res.json({ status: "success" });
};

const putContactController = async (req, res, next) => {
  const {_id: userId} = req.user;
  const id = req.params.contactId;
  const { name, email, phone } = req.body;
  await putContactById(id, { name, email, phone }, userId);
  res.json({ status: "success" });
};

const patchContactController = async (req, res, next) => {
  const {_id: userId} = req.user;
  const id = req.params.contactId;
  const { favorite } = req.body;

  const contact = await updateStatusContactById(id, { favorite }, userId);
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
