const { NotFound } = require("http-errors");
const contactsOperation = require("../model");
const { sendSuccessResponse } = require("../utils");

const listContacts = async (req, res) => {
  const contacts = await contactsOperation.listContacts();
  sendSuccessResponse(res, { contacts });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsOperation.getContactById(contactId);
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendSuccessResponse(res, { contact });
};

const addContact = async (req, res) => {
  const contact = await contactsOperation.addContact(req.body);
  sendSuccessResponse(res, { contact }, 201);
};

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsOperation.removeContactById(contactId);

  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  sendSuccessResponse(res, { message: "Success remove", contact });
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsOperation.updateContactById(
    contactId,
    req.body
  );
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendSuccessResponse(res, { contact });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContactById,
  updateContactById,
};
