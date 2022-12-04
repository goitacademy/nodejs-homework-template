const contactsDB = require("../service/contactsService");
const { NotFoundError } = require("../helpers/errors");

const getContactsList = async (req, res) => {
  const owner = req.user.id;
  const contacts = await contactsDB.getContacts(owner);
  return res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const { contactId: id } = req.params;
  const owner = req.user.id;
  const contact = await contactsDB.getContactById(id, owner);
  if (contact) {
    return res.status(200).json(contact);
  }
};

const create = async (req, res) => {
  const owner = req.user.id;
  const newContact = await contactsDB.createContact(req.body, owner);
  return res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
  const { contactId: id } = req.params;
  const owner = req.user.id;
  const deletedContact = await contactsDB.removeContact(id, owner);
  if (deletedContact) {
    return res.status(200).json({
      message: "Contact deleted",
    });
  }
  throw new NotFoundError("Contact not found");
};

const updateContact = async (req, res) => {
  const { contactId: id } = req.params;
  const owner = req.user.id;

  const updatedContact = await contactsDB.updateContact(id, req.body, owner);
  return res.status(201).json(updatedContact);
};

const updateStatus = async (req, res) => {
  const { contactId: id } = req.params;
  const owner = req.user.id;
  const updatedStatus = await contactsDB.updateContact(id, req.body, owner, {
    new: true,
  });
  if (req.body) {
    return res.status(201).json(updatedStatus);
  }
  throw new NotFoundError("Contact not found");
};

module.exports = {
  getContactsList,
  getById,
  create,
  removeContact,
  updateContact,
  updateStatus,
};
