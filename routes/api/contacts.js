// The necessary modules and libraries are imported:
const express = require('express');

const { validateBody, isValidId, authenticate } = require('../../middlewares');
const controllers = require('../../controllers/contacts');
const schemas = require('../../utils/validation/contactValidationSchemas');

// An Express router object is created:
const router = express.Router();

// Routes for handling various contact-related requests are added to this router:

// Route for getting a list of contacts (GET /):
router.get('/', authenticate, controllers.listContacts);

// Route for getting a specific contact by its ID (GET /:contactId):
router.get('/:contactId', authenticate, isValidId, controllers.getContactById);

// Route for creating a new contact (POST /):
router.post(
  '/',
  authenticate,
  validateBody(schemas.addContactSchema),
  controllers.addContact
);

// Route for updating an existing contact by its ID (PUT /:contactId):
router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(schemas.updateContactSchema),
  controllers.updateContact
);

// Route for updating the status of a contact (PATCH /:contactId/favorite):
router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(schemas.updateStatusContactSchema),
  controllers.updateStatusContact
);

// Route for deleting a contact by its ID (DELETE /:contactId):
router.delete(
  '/:contactId',
  authenticate,
  isValidId,
  controllers.removeContact
);

//  The router object is exported for use in other parts of the program:
module.exports = router;

// This code creates an API for managing contacts, where different requests are handled by respective middlewares and controllers. Middlewares like authenticate and isValidId are used for user authentication and data validation, while validation schemas ensure that the request data is correct. Controllers are responsible for handling requests and interacting with the database or other data sources.
