const { NotFound } = require("http-errors");

const contactsOperations = require("../contacts-operations");

const listContacts = async (req, res, next) => {
  const contacts = await contactsOperations.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  //console.log("id is:", contactId);
  const contact = await contactsOperations.getContactById(contactId);
  if (!contact) {
    throw new NotFound(`Contact with id: ${contactId} was not found`);
    //throw new createError(404, `Contact with id: ${contactId} was not found`);
    // res.status(404).json({
    //   status: "error",
    //   code: 404,
    //   message: `Contact with id: ${contactId} was not found`,
    // });
    // return;
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

const addContact = async (req, res, next) => {
  const result = await contactsOperations.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.removeContact(contactId);
  if (!contact) {
    throw new NotFound(`Contact with id: ${contactId} was not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: `Contact with id: ${contactId} was deleted`,
  });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await contactsOperations.updateContact(contactId, req.body);
  if (!result) {
    throw new NotFound(`Contact with id: ${contactId} was not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
