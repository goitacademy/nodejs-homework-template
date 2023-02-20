const contactsOperations = require("../models/contacts");
const { contactSchema } = require("../schemas");
const { controllerWrapper } = require("../utils");
const { HttpError } = require("../utils");

const listContacts = async (request, response) => {
  const contacts = await contactsOperations.listContacts();
  response.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const getContactById = async (request, response) => {
  const { id } = request.params;
  const result = await contactsOperations.getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  response.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const addContact = async (request, response) => {
  const { error } = contactSchema.validate(request.body);
  if (error) {
    throw HttpError(400, "missing required name field");
  }
  const result = await contactsOperations.addContact(request.body);
  response.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

const removeContact = async (request, response) => {
  const { id } = request.params;
  const result = await contactsOperations.removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  response.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

const updateContact = async (request, response) => {
  const { error } = contactSchema.validate(request.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const { id } = request.params;
  const result = contactsOperations.updateContact(id, request.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  response.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  removeContact: controllerWrapper(removeContact),
  updateContact: controllerWrapper(updateContact),
};
