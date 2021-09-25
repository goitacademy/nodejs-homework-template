const { NotFound, InternalServerError, BadRequest } = require("http-errors");
const contactsOperations = require("./../model");

const getContacts = async (req, res, next) => {
  const allContacts = await contactsOperations.getContacts();

  res.json({
    status: "Succeed",
    code: 200,
    data: allContacts,
  });
};

const getContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  const requestedContact = await contactsOperations.getContactById(contactId);
  if (!requestedContact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "Succeed",
    code: 200,
    data: requestedContact,
  });
};

const addContact = async (req, res, next) => {
  const newContact = await contactsOperations.addContact(req.body);
  if (!newContact) {
    throw new InternalServerError("Unable to add, try again later");
  }
  res.json({
    status: "Succeed",
    code: 201,
    data: newContact,
  });
};

const removeContact = async (req, res, next) => {
  const result = await contactsOperations.removeContact(req.params.contactId);
  if (!result) {
    throw new InternalServerError("Unable to remove, try again later");
  }
  if (result === -1) {
    throw new NotFound(`Contact with id=${req.params.contactId} not found`);
  }
  res.json({
    status: "Succeed",
    code: 200,
  });
};

const updateContact = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw new BadRequest("Updates required!");
  }

  const result = await contactsOperations.updateContact(
    req.params.contactId,
    req.body
  );
  if (result === -1) {
    throw new NotFound(`Contact with id=${req.params.contactId} not found`);
  }
  if (!result) {
    throw new InternalServerError("Unable to update, try again later");
  }
  res.json({
    status: "Succeed",
    code: 200,
    data: result,
  });
};

module.exports = {
  getContacts,
  getContact,
  addContact,
  removeContact,
  updateContact,
};
