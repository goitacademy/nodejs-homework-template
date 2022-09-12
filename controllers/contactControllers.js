const {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatus,
} = require("../services");

const getContactsController = async (req, res) => {
  const contacts = await getContacts();

  res.status(200).json(contacts);
};

const getByIdController = async (req, res) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);

  res.status(200).json({ status: "success", contact });
};

const addContactController = async (req, res) => {
  await addContact(req.body);

  res.status(200).json({ status: "success" });
};

const deleteContactController = async (req, res) => {
  const id = req.params.contactId;
  const contact = await deleteContact(id);

  res.status(200).json({ status: "success", contact });
};

const updateContactController = async (req, res) => {
  const id = req.params.contactId;
  const updatedContact = await updateContact(id, req.body);

  res.status(200).json({ status: "success", updatedContact });
};

const updateContactStatusController = async (req, res) => {
  const id = req.params.contactId;
  const { favorite } = req?.body;
  const updatedContact = await updateStatus(id, favorite);

  res.status(200).json({ status: "success", updatedContact });
};

module.exports = {
  getContactsController,
  getByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateContactStatusController,
};
