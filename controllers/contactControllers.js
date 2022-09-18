const {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatus,
} = require("../services");

const getContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  let { page = 1, limit = 10, favorite } = req.query;

  const skip = (parseInt(page) - 1) * limit;
  limit = parseInt(limit) > 20 ? 20 : limit;

  const contacts = await getContacts(userId, skip, limit, favorite);

  res.status(200).json({ contacts, page, limit });
};

const getByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const contactId = req.params.contactId;

  const contact = await getContactById(contactId, userId);

  res.status(200).json({ status: "success", contact });
};

const addContactController = async (req, res) => {
  const { _id: userId } = req.user;

  await addContact(req.body, userId);

  res.status(200).json({ status: "success" });
};

const deleteContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const contactId = req.params.contactId;

  const contact = await deleteContact(contactId, userId);

  res.status(200).json({ status: "success", contact });
};

const updateContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const contactId = req.params.contactId;

  const updatedContact = await updateContact(contactId, req.body, userId);

  res.status(200).json({ status: "success", updatedContact });
};

const updateContactStatusController = async (req, res) => {
  const { _id: userId } = req.user;
  const contactId = req.params.contactId;
  const { favorite } = req?.body;

  const updatedContact = await updateStatus(contactId, favorite, userId);

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
