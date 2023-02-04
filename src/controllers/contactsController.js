const {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");

const getContacts = async (req, res) => {
  const { id } = req.user;
  const data = await listContacts(id);
  res.status(200).json({ data });
};

const getContById = async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);

  res.status(200).json({ code: 200, data });
};

const removeCont = async (req, res) => {
  const { contactId } = req.params;
  await removeContact(contactId);

  res.status(200).json({
    code: 200,
    contactId,
    message: "Contact deleted successfully!",
  });
};

const addCont = async (req, res) => {
  const body = req.body;
  const data = await addContact(body);
  res.status(201).json({ code: 201, data });
};

const updateCont = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const data = await updateContact(contactId, body);

  res.status(200).json({ code: 200, data });
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const data = await updateStatusContact(contactId, body);

  res.status(200).json({ code: 200, data });
};

module.exports = {
  getContacts,
  getContById,
  removeCont,
  addCont,
  updateCont,
  updateFavorite,
};
