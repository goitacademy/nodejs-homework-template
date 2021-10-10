const { NotFound } = require("http-errors");

const contactsOperation = require("../model/index");

const getAll = async (req, res, next) => {
  const allContacts = await contactsOperation.getContacts();
  res.json(allContacts);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await contactsOperation.getContactById(contactId);
  if (!contactById) {
    throw new NotFound(`Contact with id = ${contactId} not found`);
  }
  res.json(contactById);
};

const add = async (req, res, next) => {
  const newContact = await contactsOperation.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      newContact,
    },
  });
};
const updateById = async (req, res, next) => {
  const { body } = req;
  const { contactId } = req.params;
  const updatedContact = await contactsOperation.updateContact(contactId, body);
  if (!updatedContact) {
    throw new NotFound(`Contact with id = ${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { updatedContact },
  });
};

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const removeContact = await contactsOperation.removeContact(contactId);
  if (!removeContact) {
    throw new NotFound(`Contact with id = ${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "Contact deleted",
  });
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  removeById,
};
