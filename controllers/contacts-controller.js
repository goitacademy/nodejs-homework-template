const contactsService = require("../models/contacts");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { body } = req;
  const result = await contactsService.addContact(body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const result = await contactsService.updateContact(id, body);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
};

// Each function handles the request and sends the response using the res object provided by the Express.js framework.

// getAllContacts retrieves a list of all contacts using the listContacts method from the contactsService
// module and sends the result as a JSON response.
// getContactById retrieves a specific contact by its ID, obtained from the request parameters(req.params).
// It uses the getContactById method from contactsService and sends the result as a JSON response.
// If the result is falsy(indicating that the contact was not found), it throws an HttpError with a status code of 404
// and a corresponding error message.
// addContact adds a new contact using the data from the request body(req.body).
// It calls the addContact method from contactsService and sends the newly added contact as a JSON response
// with a status code of 201(indicating a successful creation).
// updateContact updates an existing contact identified by its ID.It retrieves the ID from the request parameters
// and the updated contact data from the request body.It calls the updateContact method from contactsService
// and sends the updated contact as a JSON response.If the result is falsy, it throws an HttpError
// with a status code of 404 and a corresponding error message.
// removeContact removes a contact specified by its ID.It retrieves the ID from the request parameters,
// calls the removeContact method from contactsService, and sends a JSON response with a message indicating
// that the contact was deleted.If the result is falsy, it throws an HttpError with a status code of 404 and a corresponding error message.

//   Finally, the module exports an object that contains the refactored functions.Each function is wrapped
// with the ctrlWrapper function, likely for applying some common controller logic or decorators to the functions
// before they are used as route handlers.
