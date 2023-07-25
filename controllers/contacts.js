const { ctrlWrapper } = require("../helpers");
const { generateHTTPError } = require("../helpers");

const { contactsHandlers } = require("../helpers");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  // Пагінація
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;
  const result = await contactsHandlers.listCoontacts(owner, { skip, limit });
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsHandlers.getContactById(id);
  if (!contact) {
    throw generateHTTPError(404, "Not found");
  }
  res.json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsHandlers.removeContact(id);
  if (!contact) {
    throw generateHTTPError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const postContact = async (req, res) => {
  const { _id: owner } = req.user;
  const contact = await contactsHandlers.addContact({ ...req.body, owner });
  res.status(201).json(contact);
};

const putContact = async (req, res) => {
  const { id } = req.params;

  const contact = await contactsHandlers.updateContact(id, req.body);
  if (!contact) {
    throw generateHTTPError(404, "Not found");
  }
  res.json(contact);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  deleteContact: ctrlWrapper(deleteContact),
  postContact: ctrlWrapper(postContact),
  putContact: ctrlWrapper(putContact),
};
