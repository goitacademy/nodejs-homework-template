const {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} = require("../models/contacts");

const getContacts = async (_, res) => {
  const data = await listContacts();
  res.status(200).json({ data });
};

const getContById = async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (!data.length) {
    return res.status(404).json({
      code: 404,
      message: `Contact with id: ${contactId} not found`,
    });
  }
  res.status(200).json({ code: 200, data });
};

const removeCont = async (req, res) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);

  if (!data) {
    return res.status(404).json({
      code: 404,
      message: `Contact with id: ${contactId} not found`,
    });
  }

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

  if (!data) {
    return res
      .status(404)
      .json({ message: `Contact with id: ${contactId} not found` });
  }

  res.status(200).json({ code: 200, data });
};

module.exports = {
  getContacts,
  getContById,
  removeCont,
  addCont,
  updateCont,
};
