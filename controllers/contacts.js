const Contact = require('../models/contact');
const { HttpError, controllerWrapper } = require('../helpers');

/**
 * List contacts with optional filtering and pagination.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {HttpError} 404 if a contact does not exist
 * @returns {Object} JSON response containing a list of contacts, pagination information, and total count
 */
const listContacts = controllerWrapper(async (req, res) => {
  // Extract user's ID from the request
  const { _id: owner } = req.user;

  // Extract query parameters for pagination and filtering
  const {
    page = 1,
    limit = 20,
    favorite = null,
    name = null,
    email = null,
  } = req.query;
  const skip = (page - 1) * limit;

  // Define the base query with owner
  const baseQuery = { owner };

  // Add optional filters to the base query
  if (favorite) {
    baseQuery.favorite = favorite;
  }

  if (name) {
    baseQuery.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive name search
  }

  if (email) {
    baseQuery.email = { $regex: new RegExp(email, 'i') }; // Case-insensitive email search
  }

  // Fetch contacts based on the constructed query
  const data = await Contact.find(baseQuery, '-createdAt -updatedAt')
    .skip(skip)
    .limit(limit)
    .populate('owner', 'email subscription');

  // Calculate the total number of matching contacts
  const total = await Contact.countDocuments(baseQuery);

  // Respond with the data, pagination information, and total count
  res.status(200).json({ data, page: +page, limit: +limit, total });
});

/**
 * Get a contact by its ID.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {HttpError} 404 if a contact does not exist
 * @returns {Object} JSON response containing the contact's details
 */
const getContactById = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;

  // Fetch the contact by its ID and populate owner details
  const result = await Contact.findById(contactId).populate(
    'owner',
    'email subscription'
  );

  // If the contact doesn't exist, respond with a 404 error
  if (!result) {
    throw new HttpError(404);
  }

  // Respond with the contact data
  res.status(200).json(result);
});

/**
 * Add a new contact.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response containing the newly added contact's details
 */
const addContact = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;

  // Create a new contact with the owner's ID
  const result = await Contact.create({ ...req.body, owner });

  // Respond with the created contact
  res.status(201).json(result);
});

/**
 * Update an existing contact.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {HttpError} 404 if a contact does not exist
 * @returns {Object} JSON response containing the updated contact's details
 */
const updateContact = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;

  // Update the contact by its ID with the provided data
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  // If the contact doesn't exist, respond with a 404 error
  if (!result) {
    throw new HttpError(404);
  }

  // Respond with the updated contact data
  res.status(200).json(result);
});

/**
 * Update the status of a contact.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {HttpError} 404 if a contact does not exist
 * @returns {Object} JSON response containing the updated contact's details
 */
const updateStatusContact = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;

  // Update the status of the contact by its ID with the provided data
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  // If the contact doesn't exist, respond with a 404 error
  if (!result) {
    throw new HttpError(404);
  }

  // Respond with the updated contact data
  res.status(200).json(result);
});

/**
 * Remove a contact by its ID.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {HttpError} 404 if a contact does not exist
 * @returns {Object} JSON response indicating successful contact deletion
 */
const removeContact = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;

  // Remove the contact by its ID
  const result = await Contact.findByIdAndRemove(contactId);

  // If the contact doesn't exist, respond with a 404 error
  if (!result) {
    throw new HttpError(404);
  }

  // Respond with a success message
  res.status(200).json({
    message: 'contact deleted',
  });
});

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
};

// This JavaScript code defines a set of controller functions for managing contacts, including listing contacts, getting a contact by ID, adding, updating, updating the status, and removing a contact. These functions are wrapped in error handling logic, and they interact with the Contact model. In case of errors, appropriate HTTP status codes and error messages are returned in the responses.
