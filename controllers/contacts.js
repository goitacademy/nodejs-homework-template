const { NotFound } = require("http-errors");
const { Contact } = require("../models");
const { sendSuccessResponse } = require("../utils");

const listContacts = async (req, res) => {
  const contacts = await Contact.find({}, "_id name email phone favorite");
  sendSuccessResponse(res, { contacts });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(
    contactId,
    "_id name email phone favorite"
  );
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendSuccessResponse(res, { contact });
};

const addContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  sendSuccessResponse(res, { contact }, 201);
};

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);

  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  sendSuccessResponse(res, { message: "Success remove", contact });
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendSuccessResponse(res, { contact });
};

const updateFavoriteStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
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
  updateFavoriteStatus,
};
